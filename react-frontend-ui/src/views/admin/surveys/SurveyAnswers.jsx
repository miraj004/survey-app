import Page from "../../../components/Page.jsx";
import {useEffect, useState} from "react";
import axiosClient from "../../../axios-client.jsx";
import {useParams} from "react-router-dom";
import useLoadingContext from "../../../contexts/LoadingContextProvider.jsx";

export default function SurveyAnswers() {
    const {slug} = useParams()
    const [survey, setSurvey] = useState(() => {})
    const {loading, setLoading} = useLoadingContext();

    useEffect(() => {
        getAnswers();
    }, []);

    const getAnswers = async () => {
        setLoading(() => true);
        try {
            const response = await axiosClient.get(`/survey/${slug}/answers`);
            console.log('Response:',response)
            setSurvey(() => response.data);
        }  catch (e) {
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
                    <h1 className={'text-2xl text-white'}>{survey?.title}</h1>
                    <h3 className={'text-amber-400'}>{survey?.survey_answers[0]?.end_date}</h3>
                    <h4 className={'text-cyan-400'}>{survey?.created_at}</h4>

                    <article className={
                        'divide-y divide-gray-700'

                    }>
                        {survey?.survey_questions?.length > 0 && survey.survey_questions.map((question, index) => {
                            return (
                                <div key={index} className={'relative'}>
                                    <h2 key={index + '-que'}><span className={'text-cyan-500 font-bold'}>{index + 1}</span>. {question.question}</h2>
                                    {
                                        question?.survey_question_answers?.length > 0 && question.survey_question_answers.map((answer, answerIndex) => {
                                            let answerContent;
                                            const parsedAnswer = JSON.parse(answer.answer);
                                            answerContent = parsedAnswer.join(', ');
                                            return (
                                                <p className={'ms-4'} key={answerIndex + '-ans'}>
                                                    <span className={'text-green-400'}>{answerIndex + 1}</span> {answerContent}
                                                </p>
                                            );
                                        })}
                                    {question?.survey_question_answers?.length === 0 && <p className={'text-red-400'}>Not answered yet!</p>}
                                    {question?.survey_question_answers?.length > 0 && <span className={'absolute top-0 right-0 text-white bg-blue-600 px-2 py-1'}>Total Answer: {question?.survey_question_answers?.length}</span>}
                                </div>
                            )
                        })}

                    </article>
                </>
            }
        </Page>
    )
}