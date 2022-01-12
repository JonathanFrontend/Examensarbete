import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

function LoginPage(props) {
    const { user, setUser } = useContext(UserContext);
    return (
        <main className='main'>
            <section>
                <h1>Log In page</h1>
                <p>
                    {/* {JSON.stringify(user)} */}
                    {user ? user.username : "login please"}
                </p>
                <button onClick={() => setUser({ username: "OOgieBoogie" })}>Log in</button>
            </section>

        </main>
    );
}

export default LoginPage;