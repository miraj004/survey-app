import {Button} from "flowbite-react";
import {useState} from "react";
import Input from "../../components/core/Input.jsx";
import CheckBox from "../../components/core/CheckBox.jsx";
import axiosClient from "../../axios-client.jsx";
import {useAuthContext} from "../../contexts/AuthContextProvider.jsx";
import useLoadingContext from "../../contexts/LoadingContextProvider.jsx";

export default function Login() {


    const {setCurrentUser, setUserToken} = useAuthContext();
    const {loading, setLoading} = useLoadingContext()
    const [errors, setErrors] = useState(() => []);

    const [credentials, setCredentials] = useState(() => ({
        email: '',
        password: '',
        remember: false
    }))

    const handleChange = (e) => {
        const {id, value, type, checked} = e.target;
        setCredentials((prevState) => ({
            ...prevState, [id]: type === 'checkbox' ? checked:value}
        ))
    }

    const login = async (e) => {
        e.preventDefault();
        setLoading(() => true)
        setErrors(() => [])
        try {
            const response = await axiosClient.post('/login', credentials);
            setUserToken(response.data.token)
            setCurrentUser(() => response.data.user)
        } catch(e) {
            if (e.response.status === 422) {
                const errors = e.response.data.errors || '';
                setErrors(errors ? errors:e.response.data)
            } else {
                console.log('Login Request Error:', e)
            }
        } finally {
            setLoading(() => false)
        }
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={login}>
            <Input id={'email'} type={'email'} label={'Your email'} value={credentials.email}
                   handleChange={handleChange} placeholder={'user@example.com'}
                   error={errors && errors['email']}
            />
            <Input id={'password'} type={'password'} label={'Your password'} value={credentials.password}
                   handleChange={handleChange}
                   placeholder={'●●●●●●'}
                   error={errors && errors['password']}
            />
            <CheckBox id={'remember'} label={'Remember'} onChange={handleChange}/>
            <Button type="submit" gradientDuoTone={'purpleToPink'} outline
            disabled={loading}
            >Login</Button>
        </form>
    )
}