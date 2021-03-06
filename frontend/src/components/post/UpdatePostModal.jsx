import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { postSchema } from '../../validations/PostValidation';

/* this modal appears when we click on the "modifier" in the post option modal,
 * it only allows users to update the text of their post
 * the post props refers to the concerned post
 * the modal state is handle in the MoreOptionsPostModal component thanks to the showModal props
*/
const UpdatePostModal = ({ showModal, post }) => {
    const id = post.id;
    //existing image 
    const [postImageUrl, setPostImageUrl] = useState(post.imageUrl)

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

    const handleInput = async () => {
        const post = getValues();
        const settings = {
            method: 'PUT',
            credentials: "include",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                textContent: post.textContent,
            }),
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
                <div className="update-post">
                    <div className='user-content'>
                        <form onSubmit={handleSubmit(handleInput)} className="update-post">
                            <textarea id="update-textarea" minLength='2' maxLength='280' placeholder="Ecrivez quelque chose..." name="textContent" defaultValue={post.textContent} required {...register("textContent")} />
                            {postImageUrl ?
                                <>
                                    <br /><br />
                                    <div className='image-preview-container'>
                                        <img src={postImageUrl} alt={postImageUrl.name} />
                                    </div>
                                </>
                                : null}
                            <div className="new-post-icons-container">
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