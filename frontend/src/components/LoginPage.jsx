import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Navigate, useNavigate } from "react-router-dom";

function LoginPage(props) {
    const { user, setUser } = useContext(UserContext);
    const [usernameinput, setUsernameinput] = useState("");
    const [passwordinput, setPasswordinput] = useState("");
    const navigate = useNavigate();
    if (user) {
        <Navigate to={"/user"} />
    } else {
        return (
            <main className='main'>
                <section>
                    <h1>Log In page</h1>
                    <div>
                        <label htmlFor='username'>Username: </label>
                        <input type={"text"} id="username" onChange={(e) => setUsernameinput(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor='password'>Password: </label>
                        <input type={"password"} id="password" onChange={(e) => setPasswordinput(e.target.value)} />
                    </div>
                    <p>
                        {/* {JSON.stringify(user)} */}
                        {user ? user.username : "login please"}
                    </p>
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
                            }

                        }).catch(err => console.error(err));

                    }}>Log in</button>
                </section>

            </main>
        );
    }
}

export default LoginPage;