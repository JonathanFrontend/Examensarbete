//rsf
import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav className='nav'>
            <h1 className='nav-h1'>Powler</h1>
            <Link to={"/"}>Start</Link>
            <Link to={"/user"}>User</Link>
        </nav>
    );
}

export default NavBar;