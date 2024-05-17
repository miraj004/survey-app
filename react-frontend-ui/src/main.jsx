import ReactDOM from 'react-dom/client'

import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import router from './router.jsx';

import {RouterProvider} from "react-router-dom";
import {AuthContextProvider} from './contexts/AuthContextProvider.jsx'
import {LoadingContextProvider} from "./contexts/LoadingContextProvider.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(

        <AuthContextProvider>
            <LoadingContextProvider>
                <RouterProvider router={router}/>
            </LoadingContextProvider>
        </AuthContextProvider>
)
