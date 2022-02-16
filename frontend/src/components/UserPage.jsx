import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../contexts/UserContext';

function UserPage(props) {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    return (
        <main className='main start-main user-main'>
            <section className='section start-section'>
                <div className='section-div'>
                    <div>
                        <h1>{user.user ? user.user.username : "User page"}</h1>
                    </div>
                    <div>
                        <button onClick={() => {
                            navigate("/createPoll");
                        }}>
                            Create poll
                        </button>
                        <button onClick={() => {
                            setUser(null);
                            localStorage.setItem("user", JSON.stringify(null));
                            navigate("/login");
                        }}>
                            Log out
                        </button>
                    </div>
                </div>
                <div>
                    <p>
                        {/* {user && JSON.stringify(user.user)} */}
                        {console.log(user.user)}
                    </p>
                </div>
                <div>
                </div>
            </section>
        </main>
    );
}

export default UserPage;