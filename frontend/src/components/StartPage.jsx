import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

function StartPage() {
    const { user, setUser } = useContext(UserContext);
    return (
        <main className='main'>
            <h1>start</h1>

        </main>
    );
}

export default StartPage;