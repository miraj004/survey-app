import {Button, Card} from "flowbite-react";
import {PencilIcon, TrashIcon} from "@heroicons/react/16/solid/index.js";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import axiosClient from "../axios-client.jsx";
import {toast} from "react-toastify";
import useLoadingContext from "../contexts/LoadingContextProvider.jsx";
import ConfirmDialog from "./core/ConfirmDialog.jsx";
import {useState} from "react";

export default function SurveyItem({survey, className, getSurvey, currentPage, countSurvey}) {

    const navigate = useNavigate();
    const {setLoading, theme} = useLoadingContext();
    const [show, setShow] = useState(() => false)

    const handleShow = (slug) => {
        navigate(`/surveys/public/${slug}/detail`)
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
                let url = `surveys?page=${countSurvey > 1 ? currentPage:currentPage - 1}`;
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
            <Card
                className={className}
                imgSrc={survey?.thumbnail_url}
            >
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                >
                    {survey.title}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    {survey.description}
                </p>
                <div className={'m-0'}>
                    <Button.Group className={'grid grid-cols-3'}>
                        <Button color="gray" onClick={() => handleShow(survey.slug)}>
                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Interface / External_Link">
                                    <path id="Vector" d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11" stroke="#4CA1B2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </g>
                            </svg>
                        </Button>
                        <Button color="gray" onClick={() => handleEdit(survey.slug)}>
                            <PencilIcon className="mr-3 h-4 w-4" color={'#51cfa3'}/>
                            <span className={'dark:text-gray-300 text-gray-800'}>Edit</span>
                        </Button>
                        <Button color="gray" outline onClick={() => setShow(() => true)}>
                            <TrashIcon className="mr-3 h-4 w-4" color={'#e84242'}/>
                            <span className={'dark:text-gray-300 text-gray-800'}>Delete</span>
                        </Button>
                    </Button.Group>
                </div>
            </Card>
        </>
    )
}


SurveyItem.propTypes = {
    survey: PropTypes.object.isRequired,
    className: PropTypes.string,
    getSurvey: PropTypes.func,
    currentPage: PropTypes.number,
    countSurvey: PropTypes.number,
}