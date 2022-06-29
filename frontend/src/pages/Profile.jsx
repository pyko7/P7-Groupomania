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
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';

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
    const [updateProfile, setUpdateProfile] = useState(false);
    const [updatePassword, setupdatePassword] = useState(false);
    const [deleteAccount, setdeleteAccount] = useState(false);


    return (
        <div>
            < Header />
            <main>
                <div className="main-container">
                    {isPending && <Spinner />}
                    {user &&
                        <div className="profile__container">
                            <div className="profile__header">
                                <div className='profile__header--banner'>
                                    <img src={user.bannerPicture} alt="banner picture" />
                                </div>
                            </div>

                            <div className="profile__body">
                                <div className='profile__body--profile-picture'>
                                    <img src={user.profilePicture} alt="profile picture" />
                                </div>
                                {(user.id === userId) || (userRole === 1) ?
                                    <div className='profile__body--update'>
                                        <button onClick={() => setUpdateProfile(true)}>Modifier le profil</button>
                                    </div>
                                    : null}
                                {updateProfile && <UpdateProfileModal showModal={setUpdateProfile} />}
                                <div className='profile__body--informations'>
                                    <h1 className='profile__body--informations-username'>{user.firstName} {user.lastName}</h1>
                                    <p className='profile__body--informations-bio'>Voici la bio d'un utlisateur normal</p>
                                    <i><FontAwesomeIcon icon={faCalendarDays} className='profile__body--informations-icons' />
                                        Inscrit <Moment fromNow>{user.createdAt}</Moment></i>
                                </div>
                            </div>


                            {/* <div className="profile-body_buttons">
                                    {updatePassword && <UpdatePasswordModal showModal={setupdateProfile} />}
                                    <button className="profile__container--buttons" onClick={() => setupdatePassword(true)}>Modifier le mot de passe</button>
                                    {updatePassword && <UpdatePasswordModal showModal={setupdatePassword} />}
                                    <button className="profile__container--buttons" onClick={() => setdeleteAccount(true)}>Supprimer le compte</button>
                                    {deleteAccount && <DeleteAccountModal showModal={setdeleteAccount} />}
                                </div> */}
                        </div>
                    }
                </div>
            </main >
        </div >
    );
};

export default Profile;

