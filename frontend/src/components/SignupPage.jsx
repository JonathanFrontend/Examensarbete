import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from "react-router-dom";

function LoginPage(props) {
    const { user, setUser } = useContext(UserContext);
    const [usernameinput, setUsernameinput] = useState("");
    const [emailinput, setEmailinput] = useState("");
    const [passwordinput, setPasswordinput] = useState("");
    const navigate = useNavigate();
    return (
        <main className='main'>
            <section>
                <h1>Sign In page</h1>
                <div>
                    <label htmlFor='usernameSU'>Username: </label>
                    <input type={"text"} id="usernameSU" onChange={(e) => setUsernameinput(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='emailSU'>Email: </label>
                    <input type={"email"} id="emailSU" onChange={(e) => setEmailinput(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='passwordSU'>Password: </label>
                    <input type={"password"} id="passwordSU" onChange={(e) => setPasswordinput(e.target.value)} />
                </div>
                <p>
                    {/* {JSON.stringify(user)} */}
                    {user ? user.username : "login please"}
                </p>
                <button onClick={() => {
                    console.log(usernameinput, passwordinput);
                    console.log(JSON.stringify({
                        identifier: usernameinput,
                        password: passwordinput
                    }));

                    fetch("http://localhost:1337/api/users", {
                        method: "POST",
                        headers: { "Content-type": "application/json; charset=UTF-8" },
                        body: JSON.stringify({
                            data: {
                                username: usernameinput,
                                password: passwordinput,
                                email: emailinput,
                                confirmed: true,
                                answered_polls: [],
                                polls: []
                            }
                        })
                    }).then(r => r.json()).then(d => {
                        console.log("d", d)
                        //navigate('/login')
                    }).catch(err => console.error(err));

                }}>Sign up</button>
            </section>

        </main>
    );
}

export default LoginPage;