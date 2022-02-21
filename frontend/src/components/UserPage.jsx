import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../contexts/UserContext';
import ProfileImg from "../images/default-user-icon-8.jpg"

function UserPage(props) {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [changeImage, setChangeImage] = useState(false);
    const [fileToUpload, setFileToUpload] = useState(null);

    const [changeUsername, setChangeUsername] = useState(false);
    const [newUsername, setNewUsername] = useState("");

    const [changeEmail, setChangeEmail] = useState(false);
    const [newEmail, setNewEmail] = useState("");

    const [errorMsg, setErrorMsg] = useState("");

    function updateInfo(newValueObj, newValue, type) {
        if (newValue.replace(/\s/g, '').length !== 0) {
            axios({
                method: "PUT",
                url: "http://localhost:1337/api/users/" + user.user.id,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Authorization': `Bearer ${user.jwt}`
                },
                data: newValueObj
            }).then(user_change => {
                console.log("user_change", user_change);
                if (user_change.status >= 200 && user_change.status <= 399) {
                    if (user_change.data) {
                        setErrorMsg("");
                        localStorage.setItem("user", JSON.stringify({ ...user, user: user_change.data }));
                        setUser({ ...user, user: user_change.data });
                    } else {
                        console.error(user_change.data)
                        setErrorMsg("An error occurred");
                    }
                } else {
                    console.error("user_change error", user_change);
                    setErrorMsg("You cant have this " + type);
                }
            }).catch(err => {
                console.log("err.message", err.message)
                console.log("err.status", err.status)
                if (err.message.includes("400")) {
                    setErrorMsg("You cant have this " + type);
                } else {
                    setErrorMsg("An error occurred: " + err.message);
                }
            });
        }
    }

    function onChangeFile(event) {
        setFileToUpload(event.target.files[0]);
    }
    async function handleSubmitFile(event, file) {
        event.preventDefault();
        const fileData = new FormData();
        fileData.append("files", file);
        if (fileData && file && file.type.includes("image")) {
            const upload_res = await axios({
                method: "POST",
                url: "http://localhost:1337/api/upload",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Authorization': `Bearer ${user.jwt}`
                },
                data: fileData,
            });
            if (upload_res.status === 200) {

                const user_change_pic = await axios({
                    method: "PUT",
                    url: "http://localhost:1337/api/users/" + user.user.id,
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        'Authorization': `Bearer ${user.jwt}`
                    },
                    data: {
                        profilePic: upload_res.data[0].url
                    }
                });
                if (user_change_pic.status >= 200 && user_change_pic.status <= 399) {
                    if (user_change_pic.data) {
                        localStorage.setItem("user", JSON.stringify({ ...user, user: user_change_pic.data }));
                        setUser({ ...user, user: user_change_pic.data });
                    } else {
                        console.error(user_change_pic.data)
                    }
                } else {
                    console.error(user_change_pic)
                }

            } else {
                console.error(upload_res)
            }
        }

    }

    useEffect(() => {
        if (!user) {
            setErrorMsg("You are not logged in.");
        }
    });
    return (
        <main className='main start-main user-main'>
            <section className='section start-section'>
                <div className='section-div'>
                    <div>
                        <h1>{user.user ? user.user.username : "User page"}</h1>
                    </div>
                    <div className='box-1'>
                        <div>
                            {
                                errorMsg && <p>{errorMsg}</p>
                            }
                        </div>
                        <div>
                            <div>
                                <img
                                    alt='profile-pic-default'
                                    className='profile-pic-default'
                                    src={user.user.profilePic ? `http://localhost:1337${user.user.profilePic}` : ProfileImg} />
                            </div>
                            <div>
                                <button className='scnd-btn' onClick={() => setChangeImage(!changeImage)}>{changeImage ? "Cancel" : "Change avatar"}</button>
                            </div>
                            <div>
                                {
                                    changeImage &&
                                    <form onSubmit={(e) => handleSubmitFile(e, fileToUpload)}>
                                        <input type={"file"} onChange={(e) => onChangeFile(e)} />
                                        <input className='scnd-btn' type={"submit"} value="Submit" />
                                    </form>
                                }
                            </div>
                        </div>
                        <div>
                            <strong>Username: </strong>
                            {changeUsername ?
                                <div>
                                    <input type={"text"} onChange={(e) => setNewUsername(e.target.value)} />
                                    <button className='scnd-btn' onClick={() => {
                                        updateInfo({ username: newUsername }, newUsername, "username");
                                        setChangeUsername(false);
                                    }}>Save</button>
                                </div>
                                :
                                <p>{user.user.username}</p>
                            }
                            <button className='scnd-btn' onClick={() => setChangeUsername(!changeUsername)}>{changeUsername ? "Cancel" : "Change username"}</button>
                            <br />

                            <strong>Email: </strong>
                            {changeEmail ?
                                <div>
                                    <input type={"email"} onChange={(e) => setNewEmail(e.target.value)} />
                                    <button className='scnd-btn' onClick={() => {
                                        updateInfo({ email: newEmail }, newEmail, "email");
                                        setChangeEmail(false);
                                    }}>Save</button>
                                </div> :
                                <p>{user.user.email}</p>}
                            <button className='scnd-btn' onClick={() => setChangeEmail(!changeEmail)}>{changeEmail ? "Cancel" : "Change email"}</button> <br />

                            <strong>Member since: </strong><p>{user.user.createdAt.split("T")[0]}</p>
                        </div>
                        <div className='box-1-2'>
                            <button onClick={() => {
                                navigate("/createPoll");
                            }}>
                                Create new poll
                            </button>
                            <button className='logout-btn' onClick={() => {
                                setUser(null);
                                localStorage.setItem("user", JSON.stringify(null));
                                navigate("/login");
                            }}>
                                Log out
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <p>
                        {/* {user && JSON.stringify(user.user)} */}
                    </p>
                </div>
                <div>
                </div>
            </section>
        </main>
    );
}

export default UserPage;