import Page from "../../../components/Page.jsx";
import {useEffect, useState} from "react";
import axiosClient from "../../../axios-client.jsx";
import {useParams} from "react-router-dom";
import useLoadingContext from "../../../contexts/LoadingContextProvider.jsx";

export default function SurveyAnswers() {
    const {slug} = useParams()
    const [survey, setSurvey] = useState(() => {
    })
    const {loading, setLoading} = useLoadingContext();

    useEffect(() => {
        getAnswers();
    }, []);

    const getAnswers = async () => {
        setLoading(() => true);
        try {
            const response = await axiosClient.get(`/survey/${slug}/answers`);
            console.log('Response:', response)
            setSurvey(() => response.data);
        } catch (e) {
            console.log('Error:', e)
        } finally {
            setLoading(() => false)
        }
    }

    return (
        <Page title={'Answers'}>
            {
                !loading &&
                <>
                    <div id="about" className="relative bg-white overflow-hidden mt-16 dark:bg-gray-700 mb-10 border dark:border-gray-700 shadow">
                        <div className="max-w-7xl mx-auto">
                            <div
                                className="relative z-10 pb-8 bg-white dark:bg-gray-800 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                                <svg
                                    className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white dark:text-gray-800 transform translate-x-1/2"
                                    fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none"
                                    aria-hidden="true">
                                    <polygon points="50,0 100,0 50,100 0,100"></polygon>
                                </svg>
                                <div className="pt-1"></div>
                                <main
                                    className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                                    <div className="sm:text-center lg:text-left">
                                        <h2 className="my-6 text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl dark:text-gray-300">
                                            {survey?.title}
                                        </h2>
                                        <p>
                                            {survey?.description}
                                        </p>
                                    </div>
                                </main>
                            </div>
                        </div>
                        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                            <img className="h-56 w-full object-cover object-top sm:h-72 md:h-96 lg:w-full lg:h-full"
                                 src={survey?.thumbnail_url} alt="Survey Image"/>
                        </div>
                    </div>

                    <div className="rounded p-10 w-2xl mx-auto bg-white dark:bg-gray-800 shadow">
                        {survey?.survey_questions?.length > 0 && survey.survey_questions.map((question, index) => {
                            return (
                                <div className="flex" key={index + 'm'}>
                                    <div className="mr-4 flex flex-col items-center" key={index + 'h'}>
                                        <div>
                                            <div
                                                className="font-semibold flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-900">
                                                {index + 1}
                                            </div>
                                        </div>
                                        <div className="h-full w-px bg-gray-300 dark:bg-slate-500"></div>
                                    </div>
                                    <div className="pt-1 pb-8" key={index + 'b'}>
                                        <p className="mb-2 text-xl font-bold text-gray-900 dark:text-gray-400">{question.question}</p>
                                        {
                                            question?.survey_question_answers?.length > 0 && question.survey_question_answers.map((answer, answerIndex) => {
                                                let answerContent;
                                                const parsedAnswer = JSON.parse(answer.answer);
                                                answerContent = parsedAnswer.join(', ');
                                                return (
                                                    <div className={'flex ps-2'} key={answerIndex + 'ans'}>
                                                        <div className="mr-4 flex flex-col items-center">
                                                            <div>
                                                                <div
                                                                    className="text-xs flex h-5 w-5 items-center justify-center rounded-full border border-green-800 dark:text-gray-300">
                                                                    {answerIndex + 1}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="pb-2">
                                                            <p className="text-sm text-gray-600 dark:text-slate-400"
                                                               key={answer.id}>{answerContent}</p>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </>
            }
        </Page>
    )
}