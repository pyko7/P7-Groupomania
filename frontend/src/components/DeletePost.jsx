import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const DeletePost = ({ showModal }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    /*function delete a post*/
    const confirmDelete = async () => {
        /*Get ID for posts deletion*/
        const settings = { method: "DELETE" };
        try {
            const res = await fetch("https://jsonplaceholder.typicode.com/posts/" + id, settings);
            const data = await res.json();
            if (!res.ok) throw error;
            console.log("ok");
            showModal(false);
            navigate("/");
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
                    <br/>
                    <br/>
                    <br/>
                </div>
                <div className="profile-footer">
                    <button onClick={() => showModal(false)}>Annuler</button>
                    <button onClick={confirmDelete}>Confirmer</button>
                </div>
            </div>
        </div>
    );
};

export default DeletePost;