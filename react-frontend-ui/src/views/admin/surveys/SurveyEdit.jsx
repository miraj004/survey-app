import {Button, Card, Datepicker, Label} from "flowbite-react";

import {toast} from "react-toastify";
import Page from "../../../components/Page.jsx";
import Input from "../../../components/core/Input.jsx";
import TextArea from "../../../components/core/TextArea.jsx";
import ImageInput from "../../../components/core/ImageInput.jsx";
import CheckBox from "../../../components/core/CheckBox.jsx";
import axiosClient from "../../../axios-client.jsx";
import {useEffect, useState} from "react";
import useLoadingContext from "../../../contexts/LoadingContextProvider.jsx";
import {useParams} from "react-router-dom";
import SurveyQuestions from "../../../components/SurveyQuestions.jsx";
import {showErrors, clearErrors, formatDate} from "../../../utils/helpers.js";



export default function SurveyEdit() {


    const {slug} = useParams()

    const [thumbnail, setThumbnail] = useState(null)
    const {loading, setLoading, theme} = useLoadingContext();

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
    }, [])


    const getSurvey = async () => {
        setLoading(true)
        try {

            const response = await axiosClient.get(`survey/${slug}`);
            const {
                thumbnail_url,
                title,
                description,
                expire_date,
                status,
                questions
            } = response.data.data;

            setThumbnail(() => thumbnail_url)

            questions.forEach(function(question) {
                if (question.type === 'text') {
                    delete question.options;
                }
            });

            const prevSurvey = {
                thumbnail: null,
                thumbnail_url: thumbnail_url,
                title,
                description,
                expire_date: formatDate(expire_date),
                status,
                questions
            }


            setSurvey(() => prevSurvey);
        } catch (e) {
            toast(e.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const response = await axiosClient.patch(`/surveys/${slug}`, survey);
            toast.success(response.data.message, {
                theme: theme
            });
            clearErrors();
        } catch (e) {
            if (e.response && (e.response.status === 422)) {
                const errors = e.response.data.errors;
                showErrors(errors, 'update-survey-form')
                if (e.response.data.message) {
                    toast.error(e.response.data.message, {
                        theme: theme
                    });
                }
            } else {
                toast(e.response.data.message)
            }
        } finally {
            setLoading(false)
        }
    }

    const onImageChange = (image) => {
        setSurvey((prevState) => ({
            ...prevState,
            thumbnail: image,
            thumbnail_url: ''
        }));
        setThumbnail(() => image);
    };

    const handleDateChange = (date) => {
        const formattedDate = formatDate(date)
        setSurvey((prevState) => ({
            ...prevState, expire_date: formattedDate
        }))
    }

    const handleChange = (e) => {
        const {id, value, type, checked} = e.target;
        setSurvey((prevState) => ({
            ...prevState, [id]: type === 'checkbox' ? checked : value
        }))
    }

    return (
        <Page title={'Edit Survey'}>
            <Card className={'mx-auto max-w-xl'}>
                <form onSubmit={onSubmit} encType={'multipart/form-data'} id={'update-survey-form'}>
                    <ImageInput id={'thumbnail'} onImageChange={onImageChange} srcImage={thumbnail}/>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor={'expire_date'} value={'Expire Date'}/>
                        </div>
                        <Datepicker id={'expire_date'} className={'z-10'} onSelectedDateChanged={handleDateChange}
                                    value={survey.expire_date}
                        />
                    </div>
                    <Input id={'title'} label={'Title'} handleChange={handleChange}
                           value={survey.title}
                    />
                    <div className={'flex flex-col'}>
                        <CheckBox id={'status'} label={'Active'} onChange={handleChange}
                                  checked={survey.status}
                        />
                        <span className={'w-full ps-3 text-sm'}>Weather survey publicly available</span>
                    </div>
                    <TextArea id={'description'} label={'Description'} rows={7} handleChange={handleChange}
                              value={survey.description}
                    />
                    <SurveyQuestions setSurvey={setSurvey} survey={survey}/>
                    <div className={'flex flex-row-reverse my-2'}>
                        <Button type={'submit'} gradientDuoTone={'tealToLime'} outline
                                disabled={loading}
                        >Update</Button>
                    </div>
                </form>
            </Card>
        </Page>
    )
}