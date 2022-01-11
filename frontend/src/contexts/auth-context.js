import React, { createContext, useContext, useState, useEffect } from 'react';

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const AuthContext = createContext({});

function AuthProvider(props) {
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {

    }, [])

    const login = () => {
        sleep(2000).then(() => setLoggedIn(true));
    }

    const logout = () => {
        sleep(2000).then(() => setLoggedIn(true));
    }

    const authContextValue = {
        login,
        loggedIn,
        logout
    };
    return <AuthContext.Provider value={authContextValue} {...props} />;
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };