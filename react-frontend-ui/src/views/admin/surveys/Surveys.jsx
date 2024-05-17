import Page from "../../../components/Page.jsx";
// import SurveyItem from "../../../components/SurveyItem.jsx";
import SurveyCard from "../../../components/SurveyCard.jsx";
import {Button} from "flowbite-react";
import {PlusIcon} from "@heroicons/react/16/solid/index.js";
import {useNavigate} from "react-router-dom";
import axiosClient from "../../../axios-client.jsx";
import {useEffect, useState} from "react";
import PaginationLinks from "../../../components/core/PaginationLinks.jsx";
import useLoadingContext from "../../../contexts/LoadingContextProvider.jsx";

export default function Surveys() {

    const [surveys, setSurveys] = useState(() => []);
    const [meta, setMeta] = useState(() => ({}));
    const {setLoading} = useLoadingContext();

    const navigate = useNavigate()

    const onPageChange = (link) => {
        getSurveys(link.url)
    }

    useEffect(() => {
        getSurveys();
    }, []);

    const getSurveys = async (currentUrl) => {
        const url = currentUrl || '/surveys';
        console.log('Url:', url);
        setLoading(true)
        try {
            const response = await axiosClient.get(url);
            setSurveys(response.data.data);
            setMeta(response.data.meta);
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    const handleCreate = () => {
        navigate('/surveys/create')
    }
    return (
        <Page title={'Surveys'} createButton={
            <Button id={'create-button'} type={'button'} color={'gray'} onClick={handleCreate}>
              <span className="flex items-center">
                   <PlusIcon className="h-5 w-5 mr-2"/>
                   <span>Create New</span>
              </span>
            </Button>}
        >
            <div className={'grid md:grid-cols-6 gap-5 mx-10'}>
                {surveys.length > 0 && surveys.map((survey) =>
                    <SurveyCard
                        key={survey.id}
                        className={'md:col-span-3 lg:col-span-2'}
                        getSurvey={getSurveys}
                        currentPage={meta.current_page}
                        countSurvey={surveys.length}
                        survey={{
                            thumbnail_url: survey.thumbnail_url,
                            title: survey.title,
                            description: survey.description,
                            slug: survey.slug,
                            expire_date: survey.expire_date,
                            created_at: survey.created_at
                        }}
                    />
                )}
            </div>
            {surveys.length > 0 && <PaginationLinks meta={meta} onPageChange={onPageChange}/>}
        </Page>
    )
}