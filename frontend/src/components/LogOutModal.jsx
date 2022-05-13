import React from 'react';
import { useNavigate } from 'react-router-dom';

/*update profile picture*/
const LogOutModal = ({ showModal }) => {
    const navigate = useNavigate()
    const settings = { method: 'GET', credentials: 'include' };
    const handleClick = async () => {
        const res = await fetch(`http://localhost:3000/api/auth/logout`, settings)
        const data = await res.json();
        if (!res.ok) return;
        navigate('/auth/login');
        return data;
    }



    return (
        <div className="profile-modal" onClick={() => showModal(false)}>
            <div className="update-modale" onClick={e => e.stopPropagation()}>
                <div className="profile-header">
                    <h1>Voulez-vous vous déconnecter ?</h1>
                </div>
                <div className="profile-body">
                    <p className='deletion-message'>Vous pouvez vous reconnecter à n'importe quel moment.
                    </p>
                </div>
                <div className="profile-footer">
                    <button className='footer-buttons' onClick={() => showModal(false)}> Annuler</button>
                    <button className='footer-buttons' onClick={handleClick}>Se déconnecter</button>
                </div>
            </div>
        </div>
    );
};

export default LogOutModal;