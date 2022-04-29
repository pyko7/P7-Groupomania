import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useParams } from 'react-router-dom';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';

/*update profile picture*/
const LogOutModal = ({ showModal }) => {
    const navigate = useNavigate()
    const handleClick = async () => {
        navigate('/login');
    }

    /*prevent scrolling behind opened modal*/
    // useEffect(() => {
    //     if (showModal) {
    //         document.body.style.overflow = 'hidden'
    //     }
    // }, [showModal])

    return (
        <div className="profile-modal" onClick={() => showModal(false)}>
            <div className="profile-container" onClick={e => e.stopPropagation()}>
                <div className="profile-header">
                    <h1>Voulez-vous vous déconnecter ?</h1>
                </div>
                <div className="profile-body">
                    <p className='deletion-message'>Vous pouvez vous reconnecter à n'importe quel moement.
                    </p>
                </div>
                <div className="profile-footer">
                    <button onClick={() => showModal(false)}> Annuler</button>
                    <button onClick={handleClick}>Se déconnecter</button>
                </div>
            </div>
        </div>
    );
};

export default LogOutModal;