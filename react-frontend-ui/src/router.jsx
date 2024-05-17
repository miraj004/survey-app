import {createBrowserRouter, Navigate} from "react-router-dom";

// Guest
import Register from "./views/guest/Register.jsx";
import Login from "./views/guest/Login.jsx";

// Authenticated
import Dashboard from "./views/admin/Dashboard.jsx";
import Surveys from "./views/admin/surveys/Surveys.jsx";
import SurveyShow from "./views/admin/surveys/SurveyShow.jsx";
import SurveyEdit from "./views/admin/surveys/SurveyEdit.jsx";
import SurveyCreate from "./views/admin/surveys/SurveyCreate.jsx";

// Layouts
import GuestLayout from "./layouts/GuestLayout.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";

// Error Page
import PageNotFound from "./errors/PageNotFound.jsx";
import SurveyAnswers from "./views/admin/surveys/SurveyAnswers.jsx";


const router = createBrowserRouter([

    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to={'/login'}/>
            },
            {
                path: '/register',
                element: <Register/>
            },
            {
                path: '/login',
                element: <Login/>
            }
        ]
    },
    {
        path: '/',
        element: <AuthLayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to={'/dashboard'}/>
            },
            {
                path: '/dashboard',
                element: <Dashboard/>
            },
            {
                path: '/surveys',
                element: <Surveys/>
            },
            {
                path: '/surveys/create',
                element: <SurveyCreate/>
            },
            {
                path: '/survey/:slug/answers',
                element: <SurveyAnswers/>
            },
            {
                path: '/surveys/:slug/edit',
                element: <SurveyEdit/>
            }
        ]
    },
    {
        path: '/surveys/public/:slug/detail',
        element: <SurveyShow/>
    },
    {
        path: '*',
        element: <PageNotFound/>
    }
])

export default router;