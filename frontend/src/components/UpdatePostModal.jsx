import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { postSchema } from '../validations/PostValidation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const UpdatePostModal = ({ showModal, post }) => {
    const id = post.id;
    const [updateImageUrl, setUpdateImageUrl] = useState(null);
    const [updateImagePreview, setUpdateImagePreview] = useState(null);

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
        if (updateImageUrl || updateImagePreview === null) {
            setUpdateImagePreview(URL.createObjectURL(e.target.files[0]))
            setUpdateImageUrl(e.target.files[0])
        }
        return
    }

    const removePreview = () => {
        if (updateImageUrl && updateImagePreview !== null) {
            setUpdateImagePreview(null)
            setUpdateImageUrl(null)
        }
        return
    }

    const handleInput = async () => {
        const post = getValues();
        let settings = {};
        if (updateImageUrl === null) {
            settings = {
                method: 'PUT',
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
            formData.append("images", updateImageUrl);

            settings = {
                method: 'PUT',
                credentials: "include",
                body: formData
            }
        }
        try {
            const res = await fetch(`http://localhost:3000/api/posts/${id}`, settings)
            const data = await res.json();
            if (!res.ok) return alert("Vous n'êtes pas autorisé à effectuer cette action !");
            alert("Votre post a été modifié")
            window.location.reload();
            return data;
        } catch (error) {
            return console.log(error);
        }
    }

    return (
        <div className="profile-modal" onClick={() => showModal(false)}>
            <div className="update-modale" onClick={e => e.stopPropagation()}>
                <div className="update-post"onLoad={loadPicture}>
                    <div className='user-content'>
                        <form onSubmit={handleSubmit(handleInput)}>
                            <textarea id="update-textarea" minLength='2' maxLength='280' placeholder="Ecrivez quelque chose..." name="textContent" defaultValue={post.textContent} required {...register("textContent")} />
                            {updateImagePreview && updateImageUrl && (
                                <div className='image-preview-container'>
                                    <img src={updateImagePreview} alt={updateImageUrl.name} />
                                    <FontAwesomeIcon icon={faXmark} aria-label='Fermer' className="remove-preview-icon" onClick={removePreview} />
                                </div>
                            )}
                            <div className="new-post-icons-container">
                                <input accept='image/jpeg,image/png' type='file' name="updateImageUrl" id="updateImageUrl" onChange={(e) => handlePicture(e)} />
                                <label htmlFor="updateImageUrl">
                                    <FontAwesomeIcon icon={faFileImage} aria-label='Ajouter une image' className='add-file-icon' />
                                </label>
                                <input type="submit" className='send-post-button' value="Envoyer" />
                            </div>
                            <i className="invalid-message">{errors.textContent?.message}</i>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdatePostModal;