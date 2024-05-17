import {useContext, createContext, useState} from 'react';

import PropTypes from 'prop-types';

export const session =   {
    key: 'ACCESS_TOKEN'
}



export const AuthContext = createContext({
    currentUser: {},
    setCurrentUser: () => {},
    userToken: null,
    setUserToken: () => {}
});

export function AuthContextProvider({children}) {

    const [currentUser, setCurrentUser] = useState({});
    const [userToken, _setUserToken] = useState(() => localStorage.getItem(session.key) || '');

    const setUserToken = (token) => {
        if (token) {
            localStorage.setItem(session.key, token)
        } else {
            localStorage.removeItem(session.key)
        }
        _setUserToken(() => token)
    }


    return (
        <AuthContext.Provider value={
            {currentUser, setCurrentUser, userToken, setUserToken}
        }>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuthContext = () => useContext(AuthContext)


AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}



