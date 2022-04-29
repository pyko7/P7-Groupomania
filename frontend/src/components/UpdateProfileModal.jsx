import React, { useEffect, useState } from 'react';
import photo from "../assets/images/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { updateUsernameSchema } from '../validations/UserValidation';


/*update profile picture*/
const UpdateProfileModal = ({ showModal }) => {
    const { id } = useParams()
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [username, setUsername] = useState('');

    /*
        *register: allows to register an input or select element and apply validation,
        handleSubmit: This function receives the form data if form validation is successful,
        getValues: read form values,
        formState: contains information about the entire form state, errors displays an error message
        *mode: validation will trigger on the submit event and invalid inputs
        *resolver: allows to use YUP as external validation
       */
    const { register, handleSubmit, formState: { errors } } = useForm({
        /*if input invalid, it displays error message when user select another input*/
        mode: 'onSubmit',
        resolver: yupResolver(updateUsernameSchema)
    });


    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);

    /*prevent scrolling behind opened modal*/
    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden'
        }
    }, [showModal])

    const handleInput = async () => {
        const settings = {
            method: 'PUT',
            headers: { 'Content-type': 'application/json; charset=UTF-8', },
            body: JSON.stringify({ username, selectedImage }),
        };

        // const res = await fetch('https://jsonplaceholder.typicode.com/users/' + { id }, settings)
        const res = await fetch('https://jsonplaceholder.typicode.com/users/1', settings)
        const data = await res.json();
        if (!res.ok) throw error;
        try {
            console.log(username);
            console.log(selectedImage);
            showModal(false);
            return data
        } catch (error) {
            return error
        }

    }

    return (

        <div className="profile-modal" onClick={() => showModal(false)}>
            <div className="profile-container" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit(handleInput)}>
                    <div className="profile-header">
                        <h1>Modification du profil</h1>
                        <input accept='image/jpeg,image/png' type='file' name="edit-photo" id="edit-photo" onChange={e => setSelectedImage(e.target.files[0])}></input>
                        {!imageUrl && !selectedImage && (<img src={photo} alt="photo de profil" />)}
                        {imageUrl && selectedImage && (<img src={imageUrl} alt="photo de profil" />)}
                        <label htmlFor="edit-photo">
                            <FontAwesomeIcon icon={faPen} className="edit-profile" />
                        </label>
                    </div>
                    <div className="profile-body">
                        <input type="text" name="newUsername" placeholder='Pseudo' minLength={3} maxLength={16} {...register("newUsername")} onChange={e => setUsername(e.target.value)} />
                        <p className="invalid-message">{errors.newUsername?.message}</p>

                    </div>
                    <div className="profile-footer">
                        <button onClick={() => showModal(false)}> Annuler</button>
                        <button>Enregistrer</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfileModal;