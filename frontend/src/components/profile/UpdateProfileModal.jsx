import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { updateUserProfile } from '../../validations/UserValidation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import useFetch from '../../hooks/useFetch';
import Spinner from "../Spinner";

/* this modal appears when we click on the "Modifier le profil" button in the profile page,
 * it allows users to update their profile picture, first name & last name
 * the modal state is handle in the Profile page thanks to the showModal props
*/
const UpdateProfileModal = ({ showModal }) => {
    const { id } = useParams();
    const { data: user, isPending } = useFetch("http://localhost:3000/api/users/" + id);
    const [updateProfilePicture, setUpdateProfilePicture] = useState(null);
    const [profilePictureUrl, setProfilePictureUrl] = useState(null);
    const [updateBannerPicture, setUpdateBannerPicture] = useState(null);
    const [bannerPictureUrl, setBannerPictureUrl] = useState(null);

    /*
        *register: allows to register an input or select element and apply validation,
        handleSubmit: This function receives the form data if form validation is successful,
        getValues: read form values,
        formState: contains information about the entire form state, errors displays an error message
        *mode: validation will trigger on the submit event and invalid inputs
        *resolver: allows to use YUP as external validation
       */
    const { register, handleSubmit, getValues, formState: { errors } } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(updateUserProfile)
    });

    /* setImageUrl create a blob url, it allows the user to see a preview of his future profile picture
     * setProfilepicture get the value of the image
     * if the user cancel the update, profilePicture get his previous value back (=user.profilePicture)
    */
    const handleProfilePicture = (e) => {
        setImageUrl(URL.createObjectURL(e.target.files[0]))
        setProfilePicture(e.target.files[0])
    }
    const handleBannerPicture = (e) => {
        setImageUrl(URL.createObjectURL(e.target.files[0]))
        setProfilePicture(e.target.files[0])
    }

    const handleInput = async () => {
        const user = getValues();
        let settings = {};
        /*If the user keep his profile picture*/
        if (profilePicture === null) {
            settings = {
                method: 'PUT',
                credentials: "include",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({
                    ...user,
                }),
            }
        } else {
            const formData = new FormData();
            formData.append("firstName", user.firstName);
            formData.append("lastName", user.lastName);
            formData.append("images", profilePicture);

            settings = {
                method: 'PUT',
                credentials: "include",
                body: formData
            }
        }
        try {
            const res = await fetch(`http://localhost:3000/api/users/${id}`, settings)
            const data = await res.json();
            if (!res.ok) return;
            window.location.reload();
            showModal(false);
            return data
        } catch (error) {
            return console.log(error);
        }
    }
    return (
        <div className="profile__modal" onClick={() => showModal(false)}>
            <div className="profile__modal--update" onClick={e => e.stopPropagation()}>
                {isPending && <Spinner />}
                {user &&
                    <form onSubmit={handleSubmit(handleInput)}>
                        <div className="profile__modal--update-header">
                            <span><FontAwesomeIcon icon={faXmark} aria-label='Close modal' onClick={() => showModal(false)} /></span>
                            <div>
                                <h1>Modification du profil</h1>
                                <input type="submit" className='footer-buttons' value="Submit" />
                            </div>
                        </div>

                        <div className="profile__modal--update-body">
                            <div className="profile__modal--update-body-banner">
                                <input accept='image/jpeg,image/png' type='file' name="bannerPicture" id="bannerPicture" onChange={(e) => handleBannerPicture(e)} />
                                {!bannerPictureUrl && !updateBannerPicture && user && (<img src={user.bannerPicture} alt="Banner picture" />)}
                                {bannerPictureUrl && updateBannerPicture && (<img src={bannerPictureUrl} alt="photo de profil" />)}
                                {/* <label htmlFor="bannerPicture">
                                    <FontAwesomeIcon icon={faPen} aria-label='Update banner picture' className="edit-profile-icon" />
                                </label> */}
                            </div>

                            <div className="profile__modal--update-body-profile-picture">
                                <input accept='image/jpeg,image/png' type='file' name="profilePicture" id="profilePicture" onChange={(e) => handleProfilePicture(e)} />
                                {!profilePictureUrl && !updateProfilePicture && user && (<img src={user.profilePicture} alt="Profile picture" />)}
                                {profilePictureUrl && updateProfilePicture && (<img src={profilePictureUrl} alt="photo de profil" />)}
                                {/* <label htmlFor="profilePicture">
                                    <FontAwesomeIcon icon={faPen} aria-label='Update profile picture' className="edit-profile-icon" />
                                </label> */}
                            </div>

                            <div className="profile__modal--update-body-user">
                                <div className="profile__modal--update-body-input">
                                    <label></label>
                                    <input type="text" name="firstName" minLength={2} maxLength={35} placeholder="First name" defaultValue={user.firstName} {...register("firstName")} />
                                    <p className="invalid-message">{errors.firstName?.message}</p>
                                </div>
                                <div className="profile__modal--update-body-input">
                                    <label></label>
                                    <input type="text" name="lastName" minLength={2} maxLength={35} placeholder="Last name" defaultValue={user.lastName} {...register("lastName")} />
                                    <p className="invalid-message">{errors.lastName?.message}</p>
                                </div>
                                
                                {/* CHANGE INPUT TO TEXTAREA */}
                                <div className="profile__modal--update-body-input">
                                    <label></label>
                                    <input type="text" name="bio" minLength={2} maxLength={35} placeholder="Bio" defaultValue={user.bio} {...register("bio")} />
                                    <p className="invalid-message">{errors.bio?.message}</p>
                                </div>

                            </div>
                        </div>
                    </form>
                }
            </div>
        </div >
    );
};

export default UpdateProfileModal;