//rsf
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

function NavBar() {
    const { user, setUser } = useContext(UserContext);
    const insp = () => {
        const rand = Math.round(Math.random() * 4);
        switch (rand) {
            case 1:
                return "make a difference";
            case 2:
                return "affect the future";
            case 3:
                return "research needs you";
            case 4:
                return "They need your help";
            default:
                return "your opinion matters";
        }
    }

    return (
        <nav className='nav'>
            <div className='box-1'>
                <h1 className='nav-h1'>Powler</h1> <span> <p> - {insp()} </p> </span>
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