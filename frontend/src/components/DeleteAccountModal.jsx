import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

/*update profile picture*/
const DeleteAccountModal = ({ showModal }) => {
    const { id } = useParams()
    const [deleteMessage, setDeleteMessage] = useState('groupomania.com/user')
    const [deleteAccount, setDeleteAccount] = useState(null);
    const [errorMessage, setErrorMessage] = useState(false)

    const handleInput = async () => {
        const settings = {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json; charset=UTF-8', },
            body: JSON.stringify({ ...values }),
        };

        // const res = await fetch('https://jsonplaceholder.typicode.com/users/' + { id }, settings)
        const res = await fetch('https://jsonplaceholder.typicode.com/users/1', settings)
        const data = await res.json();
        if (!res.ok) throw error;
        try {
            console.log("values");
            showModal(false);
            return data
        } catch (error) {
            return error
        }
    }

    /*prevent scrolling behind opened modal*/
    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden'
        }
    }, [showModal])

    const submitForm = async () => {
        if (deleteAccount !== deleteMessage) {
            setErrorMessage(true);
        }
        await handleInput();
    }
    return (
        <div className="profile-modal" onClick={() => showModal(false)}>
            <div className="profile-container" onClick={e => e.stopPropagation()}>
                <div className="profile-header">
                    <h1>Suppression du compte</h1>
                </div>
                <div className="profile-body">
                    <p className='deletion-message'>Cette action aura des effets irréversibles. Après la suppression du compte, il ne sera plus possible d'accéder au site à moins de créer à nouveau un compte.
                        <br />
                        <br />
                        Afin de supprimer le compte, veuillez recopier <strong>groupomania.com/user</strong>
                        <br />
                        <br />
                    </p>
                    <input type="text" name="confirmDeletion" onChange={e => setDeleteAccount(e.target.value)} />
                    {errorMessage && <p className='invalid-message deletion'>La saisie du champs de texte n'est pas bonne</p>}
                </div>
                <div className="profile-footer">
                    <button className='footer-buttons' onClick={() => showModal(false)}> Annuler</button>
                    <button className='footer-buttons' onClick={submitForm}>Confirmer</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccountModal;