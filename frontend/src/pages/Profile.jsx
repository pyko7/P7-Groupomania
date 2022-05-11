import React, { useState } from 'react';
import Header from '../components/Header';
import UpdateProfileModal from '../components/UpdateProfileModal';
import UpdatePasswordModal from '../components/UpdatePasswordModal';
import DeleteAccountModal from '../components/DeleteAccountModal';
import LogOutModal from '../components/LogOutModal';
import useFetch from '../hooks/useFetch';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Spinner from "../components/Spinner";

const Profile = () => {
    /*modals state*/
    const [updateProfile, setupdateProfile] = useState(false);
    const [updatePassword, setupdatePassword] = useState(false);
    const [deleteAccount, setdeleteAccount] = useState(false);
    const [logOut, setLogOut] = useState(false);

    /*get user datas*/
    const { id } = useParams();
    const { data: user, isPending } = useFetch("http://localhost:3000/api/users/" + id);

    return (
        <div>
            < Header />
            <main>
                <div className="main-container">
                    {isPending && <Spinner />}
                    {user && <div className="profile-container">
                        <div className="profile-header">
                            <img src={user.profilePicture} alt="photo de profil" />
                        </div>
                        <div className="profile-body">
                            <h1>{user.firstName} {user.lastName}</h1>
                            <div className="profile-body_buttons">
                                {/* showModal control the state of modal */}
                                <button className="body-buttons" onClick={() => setupdateProfile(true)}>Modifier le profil</button>
                                {updateProfile && <UpdateProfileModal showModal={setupdateProfile} />}
                                <Link to={`/users/${id}/password`} className="body-buttons" onClick={() => setupdatePassword(true)}>
                                    Changer de mot de passe
                                </Link>
                                {updatePassword && <UpdatePasswordModal showModal={setupdatePassword} />}
                                <button className="body-buttons" onClick={() => setdeleteAccount(true)}>Supprimer le compte</button>
                                {deleteAccount && <DeleteAccountModal showModal={setdeleteAccount} />}
                                <button className="body-buttons" onClick={() => setLogOut(true)}>Se déconnecter</button>
                                {logOut && <LogOutModal showModal={setLogOut} />}
                            </div>
                        </div>
                    </div>
                    }</div>
            </main>
        </div>
    );
};

export default Profile;

