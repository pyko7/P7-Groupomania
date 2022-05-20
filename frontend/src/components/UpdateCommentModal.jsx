import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { postSchema } from '../validations/PostValidation';


const UpdatePostModal = ({ showModal, comment }) => {
    const id = comment.id;
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
        const comment = getValues();
        let settings = {
            method: 'PUT',
            credentials: "include",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                textContent: comment.textContent,
            }),
        }
        try {
            const res = await fetch(`http://localhost:3000/api/comments/${id}`, settings)
            const data = await res.json();
            if (!res.ok) return alert("Vous n'êtes pas autorisé à effectuer cette action !");
            alert("Votre commentaire a été modifié")
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
                        <form onSubmit={handleSubmit(handleInput)}>
                            <textarea minLength='2' maxLength='280' placeholder="Ecrivez quelque chose..." name="textContent" defaultValue={comment.textContent} required {...register("textContent")} />
                            <div className="new-post-icons-container">
                                <input type="submit" className='send-post-button' value="Envoyer" />
                            </div>
                            <p className="invalid-message">{errors.textContent?.message}</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdatePostModal;