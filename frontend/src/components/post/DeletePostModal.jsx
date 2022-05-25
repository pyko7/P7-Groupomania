import React from 'react';
import { useNavigate } from 'react-router-dom';
import useDelete from '../../hooks/useDelete';

/* this modal appears when we click on the "supprimer" in the post option modal,
 * it allows users to delete their post
 * the post props refers to the concerned post
 * the modal state is handle in the MoreOptionsPostModal component thanks to the showModal props
*/
const DeletePost = ({ showModal, post }) => {
    const navigate = useNavigate();
    const id = post.id

    /*function delete a post*/
    const confirmDelete = async () => {
        try {
            const res = await useDelete(`http://localhost:3000/api/posts/${id}`);
            if (!res) return;
            showModal(null);
            alert("Le poste a été supprimé");
            navigate("/");
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
                    <h1>Confirmer la suppresion ?</h1>
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

export default DeletePost;