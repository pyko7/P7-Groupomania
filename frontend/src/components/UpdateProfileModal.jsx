import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { updateUserProfile } from '../validations/UserValidation';
import Spinner from "../components/Spinner";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

/*update profile picture*/
const UpdateProfileModal = ({ showModal }) => {
    const { id } = useParams();
    const { data: user, isPending } = useFetch("http://localhost:3000/api/users/" + id);
    const [profilePicture, setProfilePicture] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);


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

    /*selects image with label and displays preview of image*/
    const handlePicture = (e) => {
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
                    firstName: user.firstName,
                    lastName: user.lastName,
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
        <div className="profile-modal" onClick={() => showModal(false)}>
            <div className="update-modale" onClick={e => e.stopPropagation()}>
                {isPending && <Spinner />}
                {user && <form onSubmit={handleSubmit(handleInput)}>
                    <div className="profile-header-update">
                        <h1>Modification du profil</h1>
                        <input accept='image/jpeg,image/png' type='file' name="profilePicture" id="profilePicture" onChange={(e) => handlePicture(e)} />
                        {!imageUrl && !profilePicture && user && (<img src={user.profilePicture} alt="photo de profil" />)}
                        {imageUrl && profilePicture && (<img src={imageUrl} alt="photo de profil" />)}
                        <label htmlFor="profilePicture">
                            <FontAwesomeIcon icon={faPen} aria-label='Modifier image de profil' className="edit-profile" />
                        </label>
                    </div>

                    <div className="profile-body">
                        <input type="text" name="firstName" minLength={2} maxLength={35} placeholder="Prénom" defaultValue={user.firstName} {...register("firstName")} />
                        <p className="invalid-message">{errors.firstName?.message}</p>
                        <input type="text" name="lastName" minLength={2} maxLength={35} placeholder="Nom" defaultValue={user.lastName} {...register("lastName")} />
                        <p className="invalid-message">{errors.lastName?.message}</p>
                    </div>

                    <div className="profile-footer">
                        <button type='button' className='footer-buttons' onClick={() => showModal(false)}> Annuler</button>
                        <button type="submit" className='footer-buttons' name="submitButton">Enregistrer</button>
                    </div>
                </form>}
            </div>
        </div >
    );
};

export default UpdateProfileModal;