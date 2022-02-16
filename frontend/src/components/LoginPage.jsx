import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from "react-router-dom";

function LoginPage(props) {
    const { user, setUser } = useContext(UserContext);
    const [usernameinput, setUsernameinput] = useState("");
    const [passwordinput, setPasswordinput] = useState("");
    const [couldNotLogIn, setCouldNotLogIn] = useState(false);
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
                        <div>
                            <label className='login-label' htmlFor='username'>Email </label><br />
                            <input
                                className={(couldNotLogIn && usernameinput === "") ? "couldNotLogIn" : ""}
                                type={"email"}
                                id="username"
                                onChange={(e) => setUsernameinput(e.target.value)} />
                        </div>
                        <div>
                            <label className='login-label' htmlFor='password'>Password </label><br />
                            <input
                                className={(couldNotLogIn && passwordinput === "") ? "couldNotLogIn" : ""}
                                type={"password"}
                                id="password"
                                onChange={(e) => setPasswordinput(e.target.value)} />
                        </div>
                        <button onClick={() => {

                            fetch("http://localhost:1337/api/auth/local", {
                                method: "POST",
                                mode: "cors",
                                headers: { "Content-type": "application/json; charset=UTF-8" },
                                body: JSON.stringify({
                                    identifier: usernameinput,
                                    password: passwordinput
                                })
                            }).then(r => r.json()).then(d => {
                                if (d.user) {
                                    setUser(d);
                                    localStorage.setItem("user", JSON.stringify(d));
                                    navigate('/user')
                                } else {
                                    setCouldNotLogIn(true)
                                }

                            }).catch(err => {
                                setCouldNotLogIn(true)
                                console.error(err)
                            });

                        }}>Log in</button>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default LoginPage;