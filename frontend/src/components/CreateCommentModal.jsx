import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { postSchema } from '../validations/PostValidation';
import moment from 'moment/min/moment-with-locales';
import Moment from 'react-moment';
import 'moment-timezone';


// instances every 30 seconds.
Moment.startPooledTimer(30000);
// Sets the moment instance to use.
Moment.globalMoment = moment;
// Set the locale for every react-moment instance to French.
Moment.globalLocale = 'fr';


const CreateCommentModal = ({ showModal, postId }) => {
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
    const id = postId;
    /*function to comment a post*/
    const createComment = async () => {
        const values = getValues();
        const settings = {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
                ...values,
            }),
        };
        try {
            const res = await fetch(
                `http://localhost:3000/api/posts/${id}/comments`,
                settings
            );
            const data = await res.json();
            if (!res.ok) return;
            showModal(false);
            window.location.reload();
            return data;
        } catch (error) {

            return error;
        }
    };


    return (
        <div className="profile-modal" onClick={() => showModal(false)}>
            <div className="update-modale" onClick={e => e.stopPropagation()}>
                <div className="profile-header-update">
                    <h1>Commentaire</h1>
                </div>
                <div className="profile-body">
                    <textarea minLength='2' maxLength='280' placeholder='Ecrivez votre réponse' name="textContent" {...register('textContent')}></textarea>
                    <p className="invalid-message">{errors.textContent?.message}</p>
                </div>
                <div className="profile-footer">
                    <button className='footer-buttons' onClick={() => showModal(false)}>Annuler</button>
                    <button className='footer-buttons' onClick={handleSubmit(createComment)}>Commenter</button>
                </div>
            </div>
        </div>
    );
};

export default CreateCommentModal;
