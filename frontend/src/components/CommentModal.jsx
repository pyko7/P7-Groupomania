import React, { useState } from 'react';
import { set, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { postSchema } from "../validations/PostValidation";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const CommentModal = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const { getValues, register } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(postSchema),
    });

    if (!props.show) {
        return null
    }

    /*function to comment a post*/
    const CreateComment = async () => {
        /*
             *register: allows to register an input or select element and apply validation,
             handleSubmit: This function receives the form data if form validation is successful,
             getValues: read form values,
             formState: contains information about the entire form state, errors displays an error message
             *mode: validation will trigger on the submit event and invalid inputs
             *resolver: allows to use YUP as external validation
            */
        const values = getValues();

        /*post method settings*/
        const settings = {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
                ...values,
            }),
        };
        try {
            const res = await fetch(
                `https://jsonplaceholder.typicode.com/comments?postId=${id}`,
                settings
            );
            const data = await res.json();
            if (!res.ok) throw Error("La requête effectuée a échouée");
            console.log(values.comment);
            navigate(`comments?postId=${id}`)
            return data;
        } catch (error) {
            return error;
        }
    };

    return (
        <div className='modal-overlay' onClick={props.onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <h1>Commentaire</h1>
                <div className="modal-body">
                    <textarea minLength='2' maxLength='280' placeholder='Ecrivez votre réponse' name="comment" {...register("comment")}></textarea>
                </div>
                <div className="modal-footer">
                    <button className='button-cancel' onClick={props.onClose}>Annuler</button>
                    <button className='button-comment' onClick={CreateComment}>Commenter</button>
                </div>
            </div>
        </div>
    );
};

export default CommentModal;
