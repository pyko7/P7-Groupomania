import React, { useState } from 'react';
import logo from '../assets/images/icon-above-font-nobg.png';
import Login from '../components/Login';
import SignUp from '../components/SignUp';

const Connect = () => {

    const [login, setLogin] = useState(true);

    return (
        <main className="connect-modal">
            <div className="connect-container">
                <div className="logo-container">
                    <img src={logo} alt="logo"/>
                </div>
                <h1 className="connect-title">
                    {login ? "Se connecter" : "S'inscrire"}
                </h1>

                {login ? <Login /> : <SignUp />}

                <h2 onClick={() => setLogin((prevLogin) => !prevLogin)}>
                    {login ? "Vous n'avez pas de compte ? Inscrivez-vous ici" : "Déjà inscrit ? Connectez-vous ici"}
                </h2>
            </div>
        </main>
    );
};

export default Connect;