import Page from "../../components/Page.jsx";
import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.jsx";
import useLoadingContext from "../../contexts/LoadingContextProvider.jsx";
import PaginationLinks from "../../components/core/PaginationLinks.jsx";
import {Card} from "flowbite-react";
import {EyeIcon} from "@heroicons/react/16/solid/index.js";
import {useNavigate} from "react-router-dom";



const Dashboard = () => {
    const [surveys, setSurveys] = useState(() => []);
    const [meta, setMeta] = useState(() => ({}));
    const {setLoading} = useLoadingContext();
    const navigate = useNavigate();

    const onPageChange = (link) => {
        getSurveys(link.url)
    }

    useEffect(() => {
        getSurveys();
    }, []);

    const getSurveys = async () => {
        setLoading(true)
        try {
            const response = await axiosClient.get('dashboard');
            setSurveys(() => response.data.data);
            setMeta(() => response.data.meta);
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    const viewAnswers = (slug) => {
        navigate(`/survey/${slug}/answers`);
    }

    return (
        <Page title={'Dashboard'}>
            <div className={'lg:grid md:grid-cols-3 gap-5 mx-10'}>
                {surveys.length > 0 && surveys.map((survey) => <Card key={survey.id}
                    imgSrc={survey?.thumbnail_url} className={'relative'}>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {survey.title}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        {survey.description}
                    </p>
                    <div className={'m-0 flex flex-row-reverse absolute bottom-0 right-0 border w-full'}>
                        <button className={'flex justify-center items-center p-2 border border-gray-200 dark:border-gray-600 rounded text-sm gap-x-2'}
                                onClick={() => viewAnswers(survey.slug)}
                        >
                            <EyeIcon className="h-4 w-4" color={'#51cfa3'}/>
                            <span className={'dark:text-gray-300 text-gray-800'}>Answers</span>
                        </button>
                    </div>
                </Card>)
                }
            </div>
            {surveys.length > 0 && <PaginationLinks meta={meta} onPageChange={onPageChange}/>}
        </Page>
    )
}


export default Dashboard;

