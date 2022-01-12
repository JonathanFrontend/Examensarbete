import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

function UserPage(props) {
    const { user, setUser } = useContext(UserContext);
    return (
        <main className='main'>
            <h1>User page</h1>
            <p>
                {JSON.stringify(user)}
            </p>
            <button onClick={() => setUser(null)}>
                Log out
            </button>
        </main>
    );
}

export default UserPage;