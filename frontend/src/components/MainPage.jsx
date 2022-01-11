import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

function MainPage(props) {
    const msg = useContext(UserContext);
    return (
        <div>
            <h1>main</h1>
            <p>{msg}</p>
        </div>
    );
}

export default MainPage;