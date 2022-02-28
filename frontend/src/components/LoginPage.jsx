import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from "react-router-dom";

function LoginPage(props) {
    const { user, setUser } = useContext(UserContext);
    const [emailinput, setEmailInput] = useState("");
    const [passwordinput, setPasswordinput] = useState("");
    const [couldNotLogIn, setCouldNotLogIn] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();
    return (
        <main className='main start-main login-main'>
            <section className='section start-section'>
                <div className='section-div'>
                    <div>
                        <h1>
                            Log in
                        </h1>
                    </div>
                    <div className='login-div'>
                        <div className='errorMsg'>
                            {
                                errorMsg && errorMsg
                            }
                        </div>
                        <div>
                            <label className='login-label' htmlFor='email'>Email </label><br />
                            <input
                                className={(couldNotLogIn) ? "couldNotLogIn" : ""}
                                type={"email"}
                                id="email"
                                onChange={(e) => setEmailInput(e.target.value)} />
                        </div>
                        <div>
                            <label className='login-label' htmlFor='password'>Password </label><br />
                            <input
                                className={(couldNotLogIn) ? "couldNotLogIn" : ""}
                                type={"password"}
                                id="password"
                                onChange={(e) => setPasswordinput(e.target.value)} />
                        </div>
                        <button onClick={() => {

                            if (emailinput.includes("@")) {
                                fetch("http://localhost:1337/api/auth/local", {
                                    method: "POST",
                                    mode: "cors",
                                    headers: { "Content-type": "application/json; charset=UTF-8" },
                                    body: JSON.stringify({
                                        identifier: emailinput,
                                        password: passwordinput
                                    })
                                }).then(r => r.json()).then(d => {
                                    console.log(d)
                                    if (d.user) {
                                        setUser(d);
                                        localStorage.setItem("user", JSON.stringify(d));
                                        navigate('/user')
                                    } else if (d.error && d.error.message) {
                                        setCouldNotLogIn(true)
                                        setErrorMsg(d.error.message)
                                    } else {
                                        setCouldNotLogIn(true)
                                        setErrorMsg("An unknown error occurred.")
                                    }

                                }).catch(err => {
                                    setCouldNotLogIn(true)
                                    console.error(err)
                                });
                            } else {
                                setCouldNotLogIn(true)
                            }

                        }}>Log in</button>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default LoginPage;