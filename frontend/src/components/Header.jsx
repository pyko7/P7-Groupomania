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

    const user = JSON.parse(localStorage.getItem("user"));
    const id = user.userId;

    return (
        <header>
            <Link to="/" className="logo-container">
                {/* change logo source according to screen size */}
                <img src={window.innerWidth <= 768 ? small : large} alt='Logo' />

            </Link>

            <nav>
                <ul>
                    <li>
                        <Link to="/">
                            <FontAwesomeIcon icon={faHome}  id="homeIcon" className='header-icons' aria-label='Accueil'  />
                        </Link>
                    </li>
                    <li>
                        <Link to={`/users/${id}`}>
                            <FontAwesomeIcon icon={faUser} className='header-icons' aria-label='Profil' />
                        </Link>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} className='header-icons' aria-label='Se déconnecter' onClick={() => setLogOut(true)} alt="Se déconnecter" />
                    </li>
                    {logOut && <LogOutModal showModal={setLogOut} />}
                </ul>
            </nav>
        </header>
    );
};

export default Header;