import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { postSchema } from '../validations/PostValidation';
import moment from 'moment/min/moment-with-locales';
import Moment from 'react-moment';
import 'moment-timezone';
import { useNavigate } from 'react-router-dom';

// instances every 30 seconds.
Moment.startPooledTimer(30000);
// Sets the moment instance to use.
Moment.globalMoment = moment;
// Set the locale for every react-moment instance to French.
Moment.globalLocale = 'fr';


const CreateCommentModal = ({ showModal }) => {
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
    const navigate = useNavigate();
    const [isPending, setIsPending] = useState(false)

    /*function to comment a post*/
    const createComment = async () => {
        const values = getValues();
        /*post method settings*/
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
                `https://jsonplaceholder.typicode.com/comments?postId=1`,
                settings
            );
            const data = await res.json();
            if (!res.ok) throw Error("La requête effectuée a échouée");
            console.log(values.comment);
            showModal(false);
            return data;
        } catch (error) {
            setIsPending(true);
            return error;
        }
    };


    return (
        <div className="profile-modal" onClick={() => showModal(false)}>
            <div className="update-modale" onClick={e => e.stopPropagation()}>
                <div className="profile-header">
                    <h1>Commentaire</h1>
                </div>
                <div className="profile-body">
                    <textarea minLength='2' maxLength='280' placeholder='Ecrivez votre réponse' name="comment" {...register('comment')}></textarea>
                    <p className="invalid-message">{errors.comment?.message}</p>
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
