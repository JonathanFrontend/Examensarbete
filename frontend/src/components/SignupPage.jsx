import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from "react-router-dom";
import useFetch from '../hooks/useFetch';

function LoginPage(props) {
    const { user, setUser } = useContext(UserContext);
    const [usernameinput, setUsernameinput] = useState("");
    const [emailinput, setEmailinput] = useState("");
    const [passwordinput, setPasswordinput] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();
    return (
        <main className='main start-main signup-main'>
            <section className='section start-section'>
                <div className='section-div'>
                    <div>
                        <h1>
                            Sign up
                        </h1>
                    </div>
                    <div className='login-div'>
                        <div>
                            <p className='errorMsg'>
                                {errorMsg}
                            </p>
                        </div>
                        <div>
                            <label htmlFor='usernameSU'>Username </label><br />
                            <input type={"text"} id="usernameSU" onChange={(e) => {
                                setUsernameinput(e.target.value);
                            }} />
                        </div>
                        <div>
                            <label htmlFor='emailSU'>Email </label><br />
                            <input type={"email"} id="emailSU" onChange={(e) => setEmailinput(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor='passwordSU'>Password </label><br />
                            <input type={"password"} id="passwordSU" onChange={(e) => setPasswordinput(e.target.value)} />
                        </div>
                        <button onClick={() => {

                            if (!usernameinput.includes("@")) {
                                fetch("http://localhost:1337/api/auth/local/register", {
                                    method: "POST",
                                    headers: { "Content-type": "application/json; charset=UTF-8" },
                                    body: JSON.stringify({
                                        username: usernameinput,
                                        password: passwordinput,
                                        email: emailinput
                                    })
                                }).then(r => r.json()).then(userData => {
                                    if (userData.user && userData.jwt) {
                                        setUser(userData);
                                        localStorage.setItem("user", JSON.stringify(userData));
                                        navigate('/');
                                    } else if (userData.error && userData.error.message) {
                                        setErrorMsg(userData.error.message)
                                    } else {
                                        setErrorMsg("An unknown error occurred.")
                                    }
                                }).catch(err => console.error(err));
                            } else {
                                setErrorMsg("Invalid username.")
                            }

                        }}>Sign up</button>
                    </div>
                </div>
            </section>

        </main>
    );

}

export default LoginPage;