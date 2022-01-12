//rsf
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

function NavBar() {
    const { user, setUser } = useContext(UserContext);
    return (
        <nav className='nav'>
            <div className='box-1'>
                <h1 className='nav-h1'>Powler</h1>
            </div>
            <div className='box-2'>
                <Link to={"/"}>Start</Link>
                {
                    user ? <Link to={"/user"}>User</Link> : <><Link to={"/login"}>Log in</Link><Link to={"/signup"}>Sign up</Link></>
                }
            </div>
        </nav>
    );
}

export default NavBar;