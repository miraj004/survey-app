import {useState} from 'react';
import {Button, TextInput} from "flowbite-react";
import PropTypes from "prop-types";
import {PlusIcon} from "@heroicons/react/20/solid/index.js";
import {NoSymbolIcon, TrashIcon, XCircleIcon} from "@heroicons/react/16/solid/index.js";


const SurveyQuestions = (props) => {

    const [questionType, setQuestionType] = useState('text');

    const addQuestion = () => {
        console.log(questionType)
        props.setSurvey((prevSurvey) => ({
            ...prevSurvey,
            questions: [...prevSurvey.questions, questionType === 'text' ? {
                type: questionType,
                question: ''
            } : {
                type: questionType,
                question: '',
                options: ['']
            }
            ]
        }))


    };

    const handleChange = (index, event) => {
        const {name, value} = event.target;
        const newQuestions = [...props.survey.questions];
        newQuestions[index][name] = value;
        props.setSurvey((prevSurvey) => ({...prevSurvey, questions: newQuestions}))
    };

    const addOption = (index) => {
        const newQuestions = [...props.survey.questions];
        newQuestions[index].options.push('');
        props.setSurvey((prevSurvey) => ({...prevSurvey, questions: newQuestions}))
    };
    const deleteOption = (questionIndex, optionIndex) => {
        const newQuestions = [...props.survey.questions];
        newQuestions[questionIndex].options.splice(optionIndex, 1);
        props.setSurvey((prevSurvey) => ({...prevSurvey, questions: newQuestions}))

    };

    const handleOptionChange = (questionIndex, optionIndex, event) => {
        const {value} = event.target;
        const newQuestions = [...props.survey.questions];
        newQuestions[questionIndex].options[optionIndex] = value;
        props.setSurvey((prevSurvey) => ({...prevSurvey, questions: newQuestions}))
    };

    const deleteQuestion = (index) => {
        const newQuestions = [...props.survey.questions];
        newQuestions.splice(index, 1);
        props.setSurvey((prevSurvey) => ({...prevSurvey, questions: newQuestions}))
    };

    const renderQuestion = (question, index) => {
        return (
            <div className="mb-4 py-4" key={index}>
                <div className={'flex items-center justify-between space-x-2'}>
                    <h3 className="text-lg font-semibold text-blue-400 dark:text-cyan-400">{`Question ${index + 1}`} <span className={'text-gray-300 dark:text-gray-500'}>({question.type})</span></h3>
                    <button
                        type={'button'}
                        className={'min-w-[20px] hover:text-red-400'}
                        onClick={() => deleteQuestion(index)}>
                        <XCircleIcon/>
                    </button>
                </div>
                <div className="mb-2">
                    <label className="block text-sm font-medium mb-1">Question:</label>
                    <TextInput
                        type="text"
                        name="question"
                        value={question.question}
                        onChange={(e) => handleChange(index, e)}
                    />
                    {<span className={'text-red-400 text-xs error-span'} id={`questions_${index}_question_error`}></span>}
                </div>
                {(question.type === 'checkbox' || question.type === 'radio' || question.type === 'select') && (
                    <div className="mb-2">
                        <label className="block text-sm font-medium mb-1">Options:</label>
                        {question.options && question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex justify-between mb-2 space-x-2">
                                <div className={'w-full'}>
                                    <TextInput
                                        className="w-full"
                                        type="text"
                                        value={option}
                                        onChange={(e) => handleOptionChange(index, optionIndex, e)}
                                    />
                                    {<span className={'text-red-400 text-xs error-span'} id={`questions_${index}_options_${optionIndex}_error`}></span>}
                                </div>
                                <div className={'flex space-x-2'}>
                                    <button
                                        type={'button'}
                                        className={'min-w-[20px] hover:text-green-500'}
                                        onClick={() => addOption(index)}
                                        title={'Add Option'}
                                    >
                                        <PlusIcon/>
                                    </button>
                                    <button
                                        type={'button'}
                                        disabled={question.options.length === 1}
                                        className={`min-w-[20px] ${question.options.length !== 1 ? 'hover:text-amber-500' : ''}`}
                                        onClick={() => deleteOption(index, optionIndex)}
                                        title={question.options.length === 1 ? 'Multi options types [checkbox, radio] cannot be without any options' : 'Delete Option'}
                                    >{
                                        question.options.length === 1 ? <NoSymbolIcon/> :
                                            <TrashIcon/>
                                    }</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };


    return (
        <div className="flex flex-col my-4 space-y-1 py-4 divide-y divide-gray-200 dark:divide-gray-600">
            {props.survey.questions.map((question, index) => renderQuestion(question, index))}
            <div className={'lg:flex lg:justify-between lg:items-center lg:space-x-4 md:space-y-4 lg:space-y-0 py-5'}>
                <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={questionType}
                    onChange={(e) => setQuestionType(e.target.value)}
                >
                    <option value="text">Text Input</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="radio">Radio Button</option>
                    <option value="select">Select</option>
                </select>
                <Button
                    className={'w-full lg:min-w-[200px] mt-2'}
                    gradientMonochrome="success"
                    onClick={addQuestion}
                >
                    Add Question
                </Button>
            </div>
        </div>
    );
};

SurveyQuestions.propTypes = {
    setSurvey: PropTypes.func,
    survey: PropTypes.object,
    errors: PropTypes.array
}

export default SurveyQuestions;
