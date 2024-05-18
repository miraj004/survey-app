import {Button, Tooltip} from "flowbite-react";
import {EyeIcon, PencilIcon, TrashIcon} from "@heroicons/react/16/solid/index.js";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import axiosClient from "../axios-client.jsx";
import {toast} from "react-toastify";
import useLoadingContext from "../contexts/LoadingContextProvider.jsx";
import ConfirmDialog from "./core/ConfirmDialog.jsx";
import {useState} from "react";
import defaultImage from '../assets/default-loading-image.png'

export default function SurveyCard({survey, className, getSurvey, currentPage, countSurvey}) {

    const navigate = useNavigate();
    const {setLoading, theme} = useLoadingContext();
    const [show, setShow] = useState(() => false)

    const handleShow = (slug) => {
        navigate(`/surveys/public/${slug}/detail`)
    }

    const viewAnswers = (slug) => {
        navigate(`/survey/${slug}/answers`);
    }

    const handleEdit = (slug) => {
        navigate(`/surveys/${slug}/edit`)
    }

    const handleDelete = async (slug) => {
        setLoading(() => true)
        try {
            const response = await axiosClient.delete(`surveys/${slug}`);
            toast.success(response.data.message, {
                theme: theme
            })

            if (currentPage > 1) {
                let url = `surveys?page=${countSurvey > 1 ? currentPage : currentPage - 1}`;
                await getSurvey(url);
            } else {
                await getSurvey();
            }
        } catch (e) {
            toast.error(e.response.message, {
                theme: theme
            })
        } finally {
            setLoading(() => false)
        }
    }

    return (
        <>
            {show && <ConfirmDialog message={'Are you sure do you want to delete?'} title={'Delete'} type={'danger'}
                                    handleConfirm={() => handleDelete(survey.slug)}
                                    setVisible={setShow}
            />}
            <div key={survey.id}
                 className={className + ' rounded overflow-hidden shadow-lg flex flex-col dark:border dark:border-gray-800'}>
                <div className="relative"><a onClick={(e) => {
                    e.preventDefault()
                    viewAnswers(survey.slug)
                }}>
                    <img className="w-full"
                         src={survey?.thumbnail_url ? survey.thumbnail_url : defaultImage}
                         alt="Survey Image"
                    />
                    <div
                        className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                    </div>
                </a>
                </div>
                <div className="px-6 py-4 mb-auto">
                        <a
                            onClick={(e) => {
                                e.preventDefault()
                                viewAnswers(survey.slug)
                            }}
                            className="font-medium text-lg inline-block transition duration-200 ease-in-out inline-block mb-2">
                            {survey.title}
                        </a>
                    <p className="text-gray-500 text-sm">
                        {survey.description}
                    </p>
                </div>
                <div
                    className="py-3 flex justify-center items-center bg-white border dark:border-gray-800 dark:bg-gray-800">
                    <div
                        className="grid place-items-center rounded-lg p-6">
                        <div className="flex divide-x divide-gray-100 dark:divide-gray-800 row">
                            <Tooltip content={'Public link'} placement={'top'}>
                            <button
                                onClick={() => handleShow(survey.slug)}
                                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded-r-none border-r-0 bg-white dark:bg-gray-700 dark:hover:bg-gray-600"
                                type="button">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <g id="Interface / External_Link">
                                            <path id="Vector"
                                                  d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11"
                                                  stroke="#4CA1B2FF" strokeWidth="2" strokeLinecap="round"
                                                  strokeLinejoin="round"/>
                                        </g>
                                    </svg>
                            </button>
                            </Tooltip>
                            <Tooltip content={'Edit'} placement={'top'}>
                            <button
                                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded-r-none border-r-0 rounded-l-none bg-white dark:bg-gray-700 dark:hover:bg-gray-600"
                                type="button"
                                onClick={() => handleEdit(survey.slug)}>
                            <PencilIcon className="h-4 w-4" color={'#51cfa3'}/>
                            </button>
                            </Tooltip>
                            <Tooltip content={'Delete'} placement={'top'}>
                            <button
                                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-50 text-black shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-85 focus:shadow-none active:opacity-85 active:shadow-none rounded-r-none border-r-0 rounded-l-none dark:bg-gray-700 dark:text-white dark:shadow-gray-900/20 dark:hover:shadow-gray-900/30/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded-r-none border-r-0 rounded-l-none bg-white dark:bg-gray-700 dark:hover:bg-gray-600"
                                type="button"
                                onClick={() => setShow(() => true)}>
                                <TrashIcon className="h-4 w-4" color={'#e84242'}/>
                            </button>
                            </Tooltip>
                            <Tooltip content={'Explore Answers'} placement={'top'}>
                            <button
                                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded-l-none bg-white dark:bg-gray-700 dark:hover:bg-gray-600"
                                type="button"
                                onClick={() => viewAnswers(survey.slug)}
                            >
                                <EyeIcon className="h-4 w-4" color={'#1c8cf8'}/>
                            </button>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


SurveyCard.propTypes = {
    survey: PropTypes.object.isRequired,
    className: PropTypes.string,
    getSurvey: PropTypes.func,
    currentPage: PropTypes.number,
    countSurvey: PropTypes.number,
}