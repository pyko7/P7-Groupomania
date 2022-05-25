import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import useDelete from '../../hooks/useDelete';

/* this modal appears when we click on the "supprimer le compte" button in the profile page,
 * it allows users to delete their account
 * the modal state is handle in the Profile page thanks to the showModal props
*/
const DeleteAccountModal = ({ showModal }) => {
    const { id } = useParams()
    const navigate = useNavigate();
    const { data: user } = useFetch("http://localhost:3000/api/users/" + id);
    const [deleteMessage, setDeleteMessage] = useState("groupomania.com/suppression");
    const [deleteAccount, setDeleteAccount] = useState(null);
    const [errorMessage, setErrorMessage] = useState(false)

    const confirmDelete = async () => {
        try {
            const deletePost = await useDelete(`http://localhost:3000/api/users/${id}`);
            if (!deletePost) return;
            showModal(false);
            alert("Votre compte a bien été supprimé")
            navigate("/auth/login");
            return data;
        } catch (error) {
            return error;
        }
    }

    /* check if the input value is equal to the delete message
     * if it's equal the account, we call the confirmDelete function
     * if it's not equal, we set errorMessage state to true and an error message is displayed
     */
    const submitDeletion = async () => {
        if (deleteAccount !== deleteMessage) {
            setErrorMessage(true);
            return
        } else {
            await confirmDelete();
        }
    }

    return (
        <div className="profile-modal" onClick={() => showModal(false)}>
            {user && <div className="update-modale" onClick={e => e.stopPropagation()}>

                <div className="profile-header-update">
                    <h1>Suppression du compte</h1>
                </div>
                <div className="profile-body">
                    <p className='deletion-message'>Cette action aura des effets irréversibles. Après la suppression du compte, il ne sera plus possible d'accéder au site à moins de créer à nouveau un compte.
                        <br />
                        <br />
                        Afin de supprimer le compte, veuillez recopier {user && <strong>{deleteMessage}</strong>}
                        <br />
                        <br />
                    </p>
                    <input type="text" name="confirmDeletion" onChange={e => setDeleteAccount(e.target.value)} />
                    {errorMessage && <p className='invalid-message deletion'>La saisie du champs de texte n'est pas bonne</p>}
                </div>
                <div className="profile-footer">
                    <button className='footer-buttons' onClick={() => showModal(false)}> Annuler</button>
                    <button className='footer-buttons' onClick={submitDeletion}>Confirmer</button>
                </div>
            </div>
            }
        </div>
    );
};

export default DeleteAccountModal;