import React, { useState } from 'react';
import Header from '../components/Header';
import photo from "../assets/images/logo.png";
import UpdateProfileModal from '../components/UpdateProfileModal';
import UpdatePasswordModal from '../components/UpdatePasswordModal';
import DeleteAccountModal from '../components/DeleteAccountModal';
import LogOutModal from '../components/LogOutModal';

const Profile = () => {
    const [updateProfile, setupdateProfile] = useState(false);
    const [updatePassword, setupdatePassword] = useState(false);
    const [deleteAccount, setdeleteAccount] = useState(false);
    const [logOut, setLogOut] = useState(false);



    return (
        <div>
            < Header />
            <main>
                <div className="main-container">
                    <div className="profile-container">
                        <div className="profile-header">
                            <img src={photo} alt="photo de profil" />
                        </div>
                        <div className="profile-body">
                            <h1>Pseudo de l'utilisateur</h1>
                            <div className="profile-body_buttons">
                                {/* showModal control the state of modal */}
                                <button onClick={() => setupdateProfile(true)}>Modifier le profil</button>
                                {updateProfile && <UpdateProfileModal showModal={setupdateProfile} />}
                                <button onClick={() => setupdatePassword(true)}>Changer de mot de passe</button>
                                {updatePassword && <UpdatePasswordModal showModal={setupdatePassword} />}
                                <button onClick={() => setdeleteAccount(true)}>Supprimer le compte</button>
                                {deleteAccount && <DeleteAccountModal showModal={setdeleteAccount} />}
                                <button onClick={() => setLogOut(true)}>Se déconnecter</button>
                                {logOut && <LogOutModal showModal={setLogOut} />}
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Profile;

