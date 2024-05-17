import {Outlet, useLocation} from "react-router";
import {Link, Navigate} from "react-router-dom";
import {useAuthContext} from "../contexts/AuthContextProvider.jsx";


export default function GuestLayout() {

    const location = useLocation();

    const {userToken} = useAuthContext()

    if(userToken) {
        return <Navigate to={'/dashboard'}  />
    }

    return (
        <div
            className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6 dark:bg-gray-900 dark:text-gray-400">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900 dark:text-gray-300">
                    {location.pathname === '/register' ? 'Create new account':'Sign in account'}
                </h2>
                <p className="mt-2 text-center text-sm leading-5">
                    Or <Link to={location.pathname === '/register' ? '/login' : '/register'}
                             className="font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                >
                    {location.pathname === '/register' ? 'Sign in to your account':'Create new account'}
                </Link>
                </p>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <Outlet/>
            </div>
        </div>
    )
}