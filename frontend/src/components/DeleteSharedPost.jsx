import React from 'react';
import useDelete from '../hooks/useDelete';


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