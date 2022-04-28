import React from 'react';
import { Link } from 'react-router-dom';

/*Images*/
import small from "../assets/images/logo.png";
import large from "../assets/images/icon-left-font-nobg.png";

const Header = () => {
    return (
        <header>
            <Link to="/" className="logo-container">
                <img src={large} srcSet={`${small} 768w, ${large} 3200w`} alt='Logo' />
            </Link>
            <nav>
                <Link to="/profile/:id">
                    <i className="fa-regular fa-user"></i>
                </Link>
            </nav>
        </header>
    );
};

export default Header;