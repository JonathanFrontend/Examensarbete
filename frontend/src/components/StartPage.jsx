import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

function StartPage() {
    const msg = useContext(UserContext);
    return (
        <main className='main'>
            <h1>start</h1>
            <p>{msg}</p>
        </main>
    );
}

export default StartPage;