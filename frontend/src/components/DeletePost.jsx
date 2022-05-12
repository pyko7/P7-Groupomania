import React from 'react';
import { useNavigate } from 'react-router-dom';
import useDelete from '../hooks/useDelete';


const DeletePost = ({ showModal, postId },) => {
    const navigate = useNavigate();
    /*function delete a post*/

    const confirmDelete = async (postId) => {
        try {
            const deletePost = await useDelete(`http://localhost:3000/api/posts/${postId}`);
            if (!deletePost) return console.log("error");
            showModal(false);
            alert("Le poste a bien été supprimé");
            navigate("/");
            window.location.reload();
            return data;
        } catch (error) {
            return error;
        }
    }

    return (
        <div className="profile-modal" onClick={() => showModal(false)}>
            <div className="profile-container" onClick={e => e.stopPropagation()}>
                <div className="profile-header">
                    <h1>Confirmer la suppresion ?</h1>
                    <br />
                    <br />
                    <br />
                </div>
                <div className="profile-footer">
                    <button className='footer-buttons' onClick={() => showModal(false)}>Annuler</button>
                    <button className='footer-buttons' onClick={async () => await confirmDelete(postId)}>Confirmer</button>
                </div>
            </div>
        </div>
    );
};

export default DeletePost;