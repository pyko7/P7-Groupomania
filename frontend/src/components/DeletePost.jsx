import React from 'react';
import { useNavigate } from 'react-router-dom';
import useDelete from '../hooks/useDelete';


const DeletePost = ({ showModal, postId },) => {
    const navigate = useNavigate();
    /*function delete a post*/
    const confirmDelete = async () => {
        try {
            const res = await useDelete(`http://localhost:3000/api/posts/${postId}`);
            if (!res) return console.log("error");
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
                <div className="profile-header">
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