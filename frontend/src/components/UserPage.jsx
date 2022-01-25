import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../contexts/UserContext';

function UserPage(props) {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    return (
        <main className='main'>
            <h1>User page</h1>
            <p>
                {user && JSON.stringify(user.user)}
            </p>
            <button onClick={() => {
                setUser(null);
                localStorage.setItem("user", JSON.stringify(null));
                navigate("/login");
            }}>
                Log out
            </button>
        </main>
    );
}

export default UserPage;