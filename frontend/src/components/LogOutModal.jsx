import React from 'react';
import { useNavigate } from 'react-router-dom';

/* this modal appears when we click on the logout icon in the header,
 * it allows users to log out of the website
 * the modal state is handle in the Header component thanks to the showModal props
 * while logging out, the cookie will be cleared as well as the localStorage
*/
const LogOutModal = ({ showModal }) => {
    const navigate = useNavigate()
    const settings = { method: 'GET', credentials: 'include' };
    const handleClick = async () => {
        const res = await fetch(`http://localhost:3000/api/auth/logout`, settings)
        const data = await res.json();
        if (!res.ok) return;
        localStorage.clear();
        alert("Vous êtes déconnecté")
        navigate('/auth/login');
        return data;
    }

    return (
        <div className="profile-modal" onClick={() => showModal(false)}>
            <div className="update-modale" onClick={e => e.stopPropagation()}>
                <div className="profile-header-update">
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