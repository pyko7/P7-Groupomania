import React from 'react';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { updatePasswordSchema } from '../../validations/UserValidation';

/* this modal appears when we click on the "Modifier le mot de passe" button in the profile page,
 * it allows users to update their password
 * the modal state is handle in the Profile page thanks to the showModal props
*/
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

    const handleInput = async () => {
        const password = getValues()
        const settings = {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({ ...password }),
        };
        try {
            const res = await fetch(`http://localhost:3000/api/users/${id}/password`, settings)
            const data = await res.json();
            if (!res.ok) return;
            alert("Votre mot de passe a été modifié")
            window.location.reload()
            showModal(false);
            return data
        } catch (error) {
            return error
        }
    }


    return (
        <div className="profile-modal" onClick={() => showModal(false)}>
            <div className="update-modale" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit(handleInput)}>
                    <div className="profile-header-update">
                        <h1>Changement de mot de passe</h1>
                    </div>
                    <div className="profile-body">
                        <input type="password" name="currentPassword" autoComplete="off" placeholder='Mot de passe actuel' minLength={6} {...register("currentPassword")} />
                        <input type="password" name="password" autoComplete="off" placeholder='Nouveau mot de passe' minLength={6} {...register("password")} />
                        <p className="invalid-message">{errors.password?.message}</p>
                        <input type="password" name="confirmPassword" autoComplete="off" placeholder='Confirmer le mot de passe' minLength={6} {...register("confirmPassword")} />
                        <p className="invalid-message">{errors.confirmPassword && "Les mots de passes doivent être similaires"}</p>
                    </div>
                    <div className="profile-footer">
                        <button type='button' className='footer-buttons' onClick={() => showModal(false)}> Annuler</button>
                        <button type="submit" className='footer-buttons' name="submitButton">Enregistrer</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatePasswordModal;