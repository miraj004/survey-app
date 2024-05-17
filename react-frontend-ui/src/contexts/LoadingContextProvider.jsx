import {createContext, useContext, useState} from 'react'
import PropTypes from "prop-types";
import { useMediaQuery } from 'react-responsive';
import Loader from "../components/core/Loader.jsx";
import {ToastContainer} from "react-toastify";

const LoadingState = createContext(false)

export function LoadingContextProvider({children}) {
    const prefersDarkMode = useMediaQuery({ query: '(prefers-color-scheme: dark)' });
    const theme = prefersDarkMode ? "dark" : "light";

    const [loading, setLoading] = useState(() => false)
    return (
        <LoadingState.Provider value={{loading, setLoading, theme}}>
            <ToastContainer/>
            {loading && <Loader/>}
            {children}
        </LoadingState.Provider>
    )
}

const useLoadingContext = () => useContext(LoadingState);
export default useLoadingContext;

LoadingContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}