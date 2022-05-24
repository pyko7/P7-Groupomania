import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useFetch from '../hooks/useFetch';
import { yupResolver } from '@hookform/resolvers/yup';
import { postSchema } from '../validations/PostValidation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


const CreatePost = () => {
    const userAuth = JSON.parse(localStorage.getItem("user"));
    const id = userAuth.userId;
    const { data: user } = useFetch(`http://localhost:3000/api/users/${id}`);
    const [imageUrl, setImageUrl] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

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
        resolver: yupResolver(postSchema)
    });


    /*selects image with label and displays preview of image*/
    const handlePicture = (e) => {
        console.log(e.target.files[0]);
        if (imageUrl || imagePreview === null) {
            setImageUrl(e.target.files[0])
            setImagePreview(URL.createObjectURL(e.target.files[0]))
        }
        return
    }

    const removePreview = () => {
        if (imageUrl && imagePreview !== null) {
            setImageUrl(null)
            setImagePreview(null)
        }
        return

    }

    const handleInput = async () => {
        const post = getValues();
        let settings = {};
        if (imageUrl === null) {
            settings = {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({
                    textContent: post.textContent,
                }),
            }
        } else {
            const formData = new FormData();
            formData.append("textContent", post.textContent);
            formData.append("images", imageUrl);

            settings = {
                method: 'POST',
                credentials: "include",
                body: formData
            }
        }
        try {
            const res = await fetch('http://localhost:3000/api/posts', settings)
            const data = await res.json();
            if (!res.ok) return;
            window.location.reload();
            return data;
        } catch (error) {
            return console.log(error);
        }
    }


    return (
        <div className="new-user-post">
            <div className="post-profile-picture">
                {user && <img src={user.profilePicture} alt='photo de profil' />}
            </div>
            <div className='user-content'>
                <form onSubmit={handleSubmit(handleInput)}>
                    <textarea minLength='2' maxLength='280' placeholder="Ecrivez quelque chose..." name="textContent" required {...register("textContent")} />
                    {imagePreview && imageUrl && (
                        <div className='image-preview-container'>
                            <img src={imagePreview} alt={imageUrl.name} />
                            <FontAwesomeIcon icon={faXmark} aria-label='fermer' className="remove-preview-icon" onClick={removePreview} />
                        </div>
                    )}
                    <div className="new-post-icons-container">
                        <input accept='image/jpeg,image/png' type='file' name="imageUrl" id="imageUrl" onChange={(e) => handlePicture(e)} />
                        <label htmlFor="imageUrl">
                            <FontAwesomeIcon icon={faFileImage} aria-label='Ajouter une image' className='add-file-icon' />
                        </label>
                        <input type="submit" className='send-post-button' value="Envoyer" />
                    </div>
                    <p className="invalid-message">{errors.textContent?.message}</p>
                </form>

            </div>
        </div>
    );
};

export default CreatePost;

