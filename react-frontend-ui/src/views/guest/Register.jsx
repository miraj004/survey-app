import {Button} from "flowbite-react";
import {useState} from "react";
import Input from "../../components/core/Input.jsx";

import axiosClient from "../../axios-client.jsx";
import {useAuthContext} from "../../contexts/AuthContextProvider.jsx";
import useLoadingContext from "../../contexts/LoadingContextProvider.jsx";

export default function Register() {

    const {setCurrentUser, setUserToken} = useAuthContext()
    const {loading, setLoading} = useLoadingContext();

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
    })

    const [errors, setErrors] = useState(() => []);

    const handleChange = (e) => {
        const {id, value} = e.target;
        setFormData((prevState) => ({...prevState, [id]: value}))
    }

    const register = async (e) => {
        e.preventDefault();
        setLoading(true)
        setErrors([])
        try {
            const response = await axiosClient.post('/register', formData);
            setUserToken(response.data.token)
            setCurrentUser(() => response.data.user)
        } catch (e) {
            console.log('Debugging:',e);
            setErrors(e.response.data.errors)
        } finally {
            setLoading(false)
        }
    }


    return (
        <form className="flex flex-col gap-4" onSubmit={register}>
            <Input id={'name'} label={'Your name'} value={formData.name}
                   handleChange={handleChange}
                   error={errors && errors['name']}
            />
            <Input id={'username'} label={'Your username'} value={formData.username}
                   handleChange={handleChange}
                   error={errors && errors['username']}
            />
            <Input id={'email'} type={'email'} label={'Your email'} value={formData.email}
                   handleChange={handleChange} placeholder={'user@example.com'}
                   error={errors && errors['email']}
            />
            <Input id={'password'} type={'password'} label={'Your password'} value={formData.password}
                   handleChange={handleChange}
                   placeholder={'●●●●●●'}
                   error={errors && errors['password']}
            />
            <Input id={'password_confirmation'} type={'password'} label={'Confirm password'}
                   value={formData.password_confirmation}
                   handleChange={handleChange}
                   placeholder={'●●●●●●'}
                   error={errors && errors['password_confirmation']}
            />
            <Button type="submit" gradientDuoTone={'greenToBlue'} outline disabled={loading}>Register</Button>
        </form>
    )
}