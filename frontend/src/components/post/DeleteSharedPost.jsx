import React from 'react';
import useDelete from '../../hooks/useDelete';

/* this modal appears when we click on the "supprimer" in the post option modal,
 * it allows users to delete cancel their post sharing
 * the post props allows users to cancel the right shared post
 * the modal state is handle in the SharedPostOptionsModal component thanks to the showModal props 
*/
const DeleteSharedPost = ({ showModal, post }) => {
    const id = post.id
    /*function delete a post*/
    const confirmDelete = async () => {
        try {
            const res = await useDelete(`http://localhost:3000/api/posts/shared/${id}`);
            if (!res) return;
            showModal(null);
            alert("Le partage a été annulé");
            window.location.reload();
            return data;
        } catch (error) {
            return error;
        }
    }

    return (
        <div className="profile-modal" onClick={() => showModal(null)}>
            <div className="update-modale" onClick={e => e.stopPropagation()}>
                <div className="profile-header-update">
                    <h1>Confirmer l'annulation ?</h1>
                    <br />
                    <br />
                    <br />
                </div>
                <div className="profile-footer">
                    <button className='footer-buttons' onClick={() => showModal(null)}>Annuler</button>
                    <button className='footer-buttons' onClick={() => confirmDelete()}>Confirmer</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteSharedPost;