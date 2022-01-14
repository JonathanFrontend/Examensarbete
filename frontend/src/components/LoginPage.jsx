import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from "react-router-dom";

function LoginPage(props) {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    return (
        <main className='main'>
            <section>
                <h1>Log In page</h1>
                <p>
                    {/* {JSON.stringify(user)} */}
                    {user ? user.username : "login please"}
                </p>
                <button onClick={() => {
                    setUser({ username: "OOgieBoogie" });
                    navigate('/user')
                }}>Log in</button>
            </section>

        </main>
    );
}

export default LoginPage;