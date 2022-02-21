import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../contexts/UserContext';
import ProfilePic from "../images/default-user-icon-8.jpg"

function UserPage(props) {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            fetch("")
        }
    }, []);
    return (
        <main className='main start-main user-main'>
            <section className='section start-section'>
                <div className='section-div'>
                    <div>
                        <h1>{user.user ? user.user.username : "User page"}</h1>
                    </div>
                    <div className='box-1'>
                        <div>
                            <img alt='profile-pic-default' className='profile-pic-default' src={ProfilePic} />
                        </div>
                        <div>
                            <strong>Username: </strong><p>{user.user.username}</p>
                            <strong>Email: </strong><p>{user.user.email}</p>
                            <strong>Member since: </strong><p>{user.user.createdAt.split("T")[0]}</p>
                        </div>
                        <div className='box-1-2'>
                            <button className='scnd-btn' onClick={() => {
                                navigate("/createPoll");
                            }}>
                                Create poll
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