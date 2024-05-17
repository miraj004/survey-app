import Page from "../../../components/Page.jsx";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import useLoadingContext from "../../../contexts/LoadingContextProvider.jsx";
import Loader from "../../../components/core/Loader.jsx";
import {Button, Card} from "flowbite-react";
import axiosGuest from "../../../axios-guest.jsx";
import axiosClient from "../../../axios-client.jsx";
import {toast} from "react-toastify";


export default function SurveyShow() {

    const {slug} = useParams()
    const {loading, setLoading, theme} = useLoadingContext()
    const [finished, setFinished] = useState(() => false)
    const navigate = useNavigate();
    const [startTime, setStartTime] = useState(() => null);

    const [answers, setAnswers] = useState(() => []);
    const [survey, setSurvey] = useState(() => ({
        thumbnail: '',
        thumbnail_url: '',
        title: '',
        description: '',
        expire_date: '',
        status: false,
        questions: []
    }))

    useEffect(() => {
        getSurvey()
        setStartTime(() => {
            return getCurrentDateTime();
        });
    }, [])

    const getSurvey = async () => {
        setLoading(true)
        try {
            const response = await axiosGuest.get(`survey/${slug}`);
            const data = response.data.data;
            setSurvey(() => data);
        } catch (e) {
            console.log('Error:', e)
            if (e.response.status === 404) {
                navigate('/not-found')
            }
        } finally {
            setLoading(false)
        }
    }

    const handleAnswer = (event, questionId) => {
        const {type, value, checked} = event.target;
        if (type === 'checkbox') {
            const questionIndex = answers.findIndex(ans => ans.question_id === questionId);
            if (checked) {
                if (questionIndex === -1) {
                    // If question is not in answers array, add it
                    setAnswers(prevAnswers => [...prevAnswers, {
                        question_id: questionId,
                        answer: [value],
                        type: 'checkbox'
                    }]);
                } else {
                    // If question is already in answers array, update its answer
                    setAnswers(prevAnswers => prevAnswers.map((ans, index) => {
                        if (index === questionIndex) {
                            // Check if value already exists in answer, if not, add it
                            if (!ans.answer.includes(value)) {
                                return {...ans, answer: [...ans.answer, value]};
                            }
                        }
                        return ans;
                    }));
                }
            } else {
                // Remove value from answer if checkbox is unchecked
                setAnswers(prevAnswers => prevAnswers.map((ans, index) => {
                    if (index === questionIndex) {
                        return {...ans, answer: ans.answer.filter(item => item !== value)};
                    }
                    return ans;
                }));
            }
        } else {
            // For non-checkbox type, update answer directly
            setAnswers(prevAnswers => ([
                ...prevAnswers.filter(ans => ans.question_id !== questionId),
                {question_id: questionId, answer: [value], type: type}
            ]));
        }
    };

    const onSubmit = async () => {

        // if (!answers.length) {
        //     toast.error('Please answer to the all questions', {
        //         theme: theme
        //     });
        //     return;
        // }

        const endTime = getCurrentDateTime();
        setLoading(() => true)
        try {
            const response = await axiosClient.post(`survey/${slug}/answer`, {
                answers: answers,
                end_time: endTime,
                start_time: startTime
            });
            if (response.status === 200) {
                toast.success(response.data.message, {
                    theme: theme
                });
                setFinished(() => true)
            }
        } catch (e) {
            console.log('Error:', e)
            if (e.response.status === 422) {
                toast.error(e.response.data.message, {
                    theme: theme
                });
            }
        } finally {
            setLoading(() => false)
        }
    }

    const getCurrentDateTime = () => {
        const endTime = new Date();
        const year = endTime.getFullYear();
        const month = String(endTime.getMonth() + 1).padStart(2, '0');
        const day = String(endTime.getDate()).padStart(2, '0');
        const hours = String(endTime.getHours()).padStart(2, '0');
        const minutes = String(endTime.getMinutes()).padStart(2, '0');
        const seconds = String(endTime.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    return (
        <Page title={'Surveys'} createButton={
            <Button id={'create-button'} type={'button'} color={'green'} onClick={onSubmit}>
              <span className="flex items-center">
                   <span>Submit</span>
              </span>
            </Button>}>
            {loading && <Loader/>}
            {!loading &&
                <Card className="mx-auto">
                    <div className="mb-6 md:grid md:grid-cols-12 md:gap-x-10">
                        <div className={'md:col-span-6'}>
                            <img src={survey.thumbnail_url} alt=""
                                 className={'border border-gray-300 dark:border-gray-600 rounded'}/>
                            <div className={'mt-8'}>
                                <h2 className="text-xl font-bold mb-4">{survey?.title}</h2>
                                <p className={'ps-2'}>
                                    {survey?.description}
                                </p>
                            </div>
                        </div>
                        <div className={'md:col-span-6 mt-10 md:mt-0 divide-y-2 dark:divide-gray-500'}>

                            {finished && <div className={'bg-green-400'}>Thank your for participant to our survey</div>}
                            {
                                survey.questions.map((question, index) => (
                                    <div key={index} className={'my-4 py-4'}>
                                        <p className={'dark:text-gray-300 text-md flex items-center gap-x-2'}>
                                            <span
                                                className={'w-4 h-4 rounded-full bg-blue-500 p-3 text-white flex items-center justify-center'}>{index + 1}</span>
                                            {question.question}
                                        </p>
                                        <div className={'divide-y mt-4'}>
                                            {(question.type === 'checkbox' || question.type === 'radio') && question.options?.length && question.options.map((option, optionIndex) => (
                                                <div key={optionIndex}
                                                     className="p-2 flex items-center justify-start ps-4 dark:border-gray-700 gap-x-2">
                                                    <input
                                                        id={optionIndex + '-' + question.id}
                                                        className={"cursor-pointer"}
                                                        type={question.type}
                                                        name={`${question.type}_${question.id}`}
                                                        value={option}
                                                        onChange={(event) => handleAnswer(event, question.id)}
                                                    />
                                                    <label htmlFor={optionIndex + '-' + question.id} key={optionIndex}
                                                           className={'text-[13px] cursor-pointer'}>
                                                        {option}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                        {question.type === 'select' && question.options?.length && (
                                            <select onChange={(event) => handleAnswer(event, question.id)}
                                                    className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            >
                                                <option value="">-- Select Country --</option>
                                                {question.options.map((option, optionIndex) => (
                                                    <option key={optionIndex} value={option}>{option}</option>
                                                ))}
                                            </select>
                                        )}
                                        {question.type === 'text' && (
                                            <input type="text"
                                                   placeholder={'Your answer'}
                                                   className={'text-[13px] w-full outline-none border border-gray-200 dark:border-gray-700 text-gray-900 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'}
                                                   onChange={(event) => handleAnswer(event, question.id)}
                                            />
                                        )}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </Card>
            }
        </Page>
    )
}