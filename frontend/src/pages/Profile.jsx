import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { decodeToken } from "react-jwt";
import moment from 'moment/min/moment-with-locales';
import Moment from 'react-moment';
import 'moment-timezone';
import Header from '../components/Header';
import UpdateProfileModal from '../components/profile/UpdateProfileModal';
import UpdatePasswordModal from '../components/profile/UpdatePasswordModal';
import DeleteAccountModal from '../components/profile/DeleteAccountModal';
import useFetch from '../hooks/useFetch';
import Spinner from "../components/Spinner";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';

// instances every 30 seconds.
Moment.startPooledTimer(30000);
// Sets the moment instance to use.
Moment.globalMoment = moment;
// Set the locale for every react-moment instance to French.
Moment.globalLocale = 'fr';



const Profile = () => {
    /*get user datas*/
    const userData = JSON.parse(localStorage.getItem('user'));
    const userId = userData.userId;
    const token = userData.token
    const decodedToken = decodeToken(token)
    const userRole = decodedToken.role
    const { id } = useParams();
    const { data: user, isPending } = useFetch(`http://localhost:3000/api/users/${id}`);
    /*modals state*/
    const [updateProfile, setupdateProfile] = useState(false);
    const [updatePassword, setupdatePassword] = useState(false);
    const [deleteAccount, setdeleteAccount] = useState(false);

    return (
        <div>
            < Header />
            <main>
                <div className="main-container">
                    {isPending && <Spinner />}
                    {user && <div className="profile-container">
                        <div className="profile-header">
                            <img src={user.profilePicture} alt="photo de profil" />
                            <div className='user-infos'>
                                <h1 id='profile-name'>{user.firstName} {user.lastName}</h1>
                                <i> <FontAwesomeIcon icon={faArrowRightToBracket} className="profile-icons" />
                                    Inscrit <Moment fromNow>{user.createdAt}</Moment></i>
                            </div>
                        </div>

                        <div className="profile-body">
                            {(user.id === userId) || (userRole === 1) ?
                                <div className="profile-body_buttons">
                                    {/* showModal control the state of modal */}
                                    <button className="body-buttons" onClick={() => setupdateProfile(true)}>Modifier le profil</button>
                                    {updateProfile && <UpdateProfileModal showModal={setupdateProfile} />}
                                    {updatePassword && <UpdatePasswordModal showModal={setupdateProfile} />}
                                    <button className="body-buttons" onClick={() => setupdatePassword(true)}>Modifier le mot de passe</button>
                                    {updatePassword && <UpdatePasswordModal showModal={setupdatePassword} />}
                                    <button className="body-buttons" onClick={() => setdeleteAccount(true)}>Supprimer le compte</button>
                                    {deleteAccount && <DeleteAccountModal showModal={setdeleteAccount} />}
                                </div> : null}
                        </div>
                    </div>
                    }</div>
            </main>
        </div>
    );
};

export default Profile;

