import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

function LoginPage(props) {
    const { user, setUser } = useContext(UserContext);
    return (
        <main className='main'>
            <h1>Log In page</h1>
            <p>
                {JSON.stringify(user)}
            </p>
        </main>
    );
}

export default LoginPage;