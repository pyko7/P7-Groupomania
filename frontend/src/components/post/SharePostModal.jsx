import React from 'react';

/* this modal appears when we click on the share icon in a post or in the post viewed as a shared post,
 * the post props allows users to share the right post
 * the modal state is handle in the PostTemplate component thanks to the showModal props
*/
const SharePostModal = ({ showModal, post }) => {
    const confirmShare = async () => {
        const id = post.id
        const settings = {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
                post,
            }),
        };
        try {
            const res = await fetch(`http://localhost:3000/api/posts/${id}`, settings);
            if (!res.ok) {
                if (res.status === 401) return alert("Le post a déjà été partagé")
                return
            }
            showModal(false);
            window.location.reload()
        } catch (error) {
            return error;
        }
    }

    return (
        <div className="profile-modal" onClick={() => showModal(false)}>
            <div className="update-modale" onClick={e => e.stopPropagation()}>

                <div className="profile-header-update">
                    <h1>Êtes-vous sûr de vouloir partager ce post ?</h1>
                </div>
                <br />
                <br />
                <br />
                <div className="profile-footer">
                    <button className='footer-buttons' onClick={() => showModal(false)}> Annuler</button>
                    <button className='footer-buttons' onClick={confirmShare}>Confirmer</button>
                </div>
            </div>
        </div>
    );
};

export default SharePostModal;