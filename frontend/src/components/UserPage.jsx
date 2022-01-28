import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../contexts/UserContext';

function UserPage(props) {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    return (
        <main className='main'>
            <div className='user-box'>
                <div className='box-1'>
                    <h1>{user ? user.user.username : "User page"}</h1>
                    <span>
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
                    </span>
                </div>
                <div>
                    <p>
                        {/* {user && JSON.stringify(user.user)} */}
                        {console.log(user.user)}
                    </p>
                </div>
                <div>
                </div>
            </div>
        </main>
    );
}

export default UserPage;