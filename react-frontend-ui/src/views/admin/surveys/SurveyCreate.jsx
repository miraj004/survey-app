// 4:30

import {Button, Card, Datepicker, Label} from "flowbite-react";

import Page from "../../../components/Page.jsx";
import Input from "../../../components/core/Input.jsx";
import TextArea from "../../../components/core/TextArea.jsx";
import ImageInput from "../../../components/core/ImageInput.jsx";
import CheckBox from "../../../components/core/CheckBox.jsx";
import axiosClient from "../../../axios-client.jsx";
import {useState} from "react";
import useLoadingContext from "../../../contexts/LoadingContextProvider.jsx";
import {useNavigate} from "react-router-dom";
import SurveyQuestions from "../../../components/SurveyQuestions.jsx";
import {toast} from "react-toastify";
import {clearErrors, formatDate, showErrors} from "../../../utils/helpers.js";

export default function SurveyCreate() {

    const navigate = useNavigate();
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

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const response = await axiosClient.post('/surveys', survey);
            toast.success(response.data.message, {
                theme: theme
            });
            clearErrors();
            if (response.status === 201) {
                navigate('/surveys')
            }
        } catch (e) {
            if (e.response.status === 422) {
                const errors = e.response.data.errors;
                showErrors(errors, 'survey-create-form')
                if (e.response.data.message) {
                    toast.error(e.response.data.message, {
                        theme: theme
                    });
                }
            } else {
                console.log('Something went wrong:', e)
            }
        } finally {
            setLoading(false)
        }
    }

    const onImageChange = (image) => {
        setSurvey((prevState) => ({
            ...prevState,
            thumbnail: image
        }));
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
        <Page title={'Create Survey'}>
            <Card className={'mx-auto max-w-xl'}>
                <form onSubmit={onSubmit} encType={'multipart/form-data'} id={'survey-create-form'}>
                    <ImageInput id={'thumbnail'} onImageChange={onImageChange}/>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor={'expire_date'} value={'Expire Date'}/>
                        </div>
                        <Datepicker id={'expire_date'} className={'z-10'} onSelectedDateChanged={handleDateChange}
                                    value={survey.expire_date}
                        />
                        <span className={'error-span text-red-400 text-xs'} id={'expire_date_error'}></span>
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
                        <Button type={'submit'} gradientDuoTone={'purpleToPink'} outline
                                disabled={loading}
                        >Save</Button>
                    </div>
                </form>
            </Card>
        </Page>
    )
}