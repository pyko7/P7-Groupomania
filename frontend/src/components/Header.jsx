import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import LogOutModal from './LogOutModal';

/*Images*/
import small from "../assets/images/logo.png";
import large from "../assets/images/icon-left-font-nobg.png";

const Header = () => {

    const [logOut, setLogOut] = useState(false);

    return (
        <header>
            <Link to="/" className="logo-container">
                <img src={large} srcSet={`${small} 768w, ${large} 3200w`} alt='Logo' />
            </Link>
            <nav>
                <ul>
                    <li><Link to="/"><FontAwesomeIcon id="homeIcon" icon={faHome} />
                    </Link></li>
                    <li><Link to="/profile/:id">
                        <FontAwesomeIcon icon={faUser} />
                    </Link></li>
                    <li><FontAwesomeIcon icon={faArrowRightFromBracket} onClick={() => setLogOut(true)} /></li>
                    {logOut && <LogOutModal showModal={setLogOut} />}
                </ul>


            </nav>
        </header>
    );
};

export default Header;