import React, { useEffect, useState } from 'react';
import { set } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Spinner from './Spinner';
import useFetch from '../hooks/useFetch';
/*update profile picture*/
const DeleteAccountModal = ({ showModal }) => {
    const { id } = useParams()
    const navigate = useNavigate();
    const { data: user, isPending } = useFetch("http://localhost:3000/api/users/" + id);
    const [deleteMessage, setDeleteMessage] = useState("groupomania.com/suppression");
    const [deleteAccount, setDeleteAccount] = useState(null);
    const [errorMessage, setErrorMessage] = useState(false)

    const handleInput = async () => {
        const userData = JSON.parse(localStorage.getItem("user"));
        const token = userData.token;
        const settings = {
            method: 'DELETE',
            headers: {
                'Authorization': "Bearer " + token,
            }
        };
        const res = await fetch('http://localhost:3000/api/users/' + id, settings)
        const data = await res.json();
        if (!res.ok) return;
        try {
            alert("Votre compte a bien été supprimé")
            showModal(false);
            navigate("/auth/login");
            return data
        } catch (error) {
            return error
        }
    }

    const submitDeletion = () => {
        if (deleteAccount !== deleteMessage) {
            setErrorMessage(true);
            return
        } else {
            handleInput();
        }
    }

    return (
        <div className="profile-modal" onClick={() => showModal(false)}>
            {/* {<isPending/> && <Spinner />}
             */}
            {user && <div className="profile-container" onClick={e => e.stopPropagation()}>

                <div className="profile-header">
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