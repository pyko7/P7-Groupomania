import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { updatePasswordSchema } from '../validations/UserValidation';

/*update profile picture*/
const UpdatePasswordModal = ({ showModal }) => {
    const { id } = useParams()
    /*
        *register: allows to register an input or select element and apply validation,
        handleSubmit: This function receives the form data if form validation is successful,
        getValues: read form values,
        formState: contains information about the entire form state, errors displays an error message
        *mode: validation will trigger on the submit event and invalid inputs
        *resolver: allows to use YUP as external validation
       */
    const { register, handleSubmit, getValues, formState: { errors } } = useForm({
        /*if input invalid, it displays error message when user select another input*/
        mode: 'onSubmit',
        resolver: yupResolver(updatePasswordSchema)
    });

    /*prevent scrolling behind opened modal*/
    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden'
        }
    }, [showModal])


    const handleInput = async () => {
        const values = getValues();
        const settings = {
            method: 'PUT',
            headers: { 'Content-type': 'application/json; charset=UTF-8', },
            body: JSON.stringify({ ...values }),
        };

        // const res = await fetch('https://jsonplaceholder.typicode.com/users/' + { id }, settings)
        const res = await fetch('https://jsonplaceholder.typicode.com/users/1', settings)
        const data = await res.json();
        if (!res.ok) throw error;
        try {
            console.log(values);
            showModal(false);
            return data
        } catch (error) {
            return error
        }
    }

    const submitForm = async () => {
        await handleInput();
    }


    return (
        <div className="profile-modal" onClick={() => showModal(false)}>
            <div className="profile-container" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit(submitForm)}>
                    <div className="profile-header">
                        <h1>Changement de mot de passe</h1>
                    </div>
                    <div className="profile-body">
                        <input type="password" name="password" placeholder='Mot de passe actuel' minLength={6} {...register("password")} />
                        <input type="password" name="newPassword" placeholder='Nouveau mot de passe' minLength={6} {...register("newPassword")} />
                        <p className="invalid-message">{errors.newPassword?.message}</p>
                        <input type="password" name="confirmNewPassword" placeholder='Confirmer le mot de passe' minLength={6} {...register("confirmNewPassword")} />
                        <p className="invalid-message">{errors.confirmNewPassword && "Les mots de passes doivent être similaires"}</p>
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

export default UpdatePasswordModal;