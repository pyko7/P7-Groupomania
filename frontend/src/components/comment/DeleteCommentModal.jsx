import React from 'react';
import useDelete from '../../hooks/useDelete';


/* this modal appears when we click on the "supprimer" in the comment option modal,
 * it allows users to delete their comment
 * the comment props refers to the concerned comment
 * it state is handle in the MoreOptionsCommentModal component thanks to the showModal props
*/
const DeletePost = ({ showModal, comment }) => {
    const id = comment.id;
    const confirmDelete = async () => {
        try {
            const res = await useDelete(`http://localhost:3000/api/comments/${id}`);
            if (!res) return console.log("error");
            showModal(null);
            alert("Le commentaire a été supprimé");
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