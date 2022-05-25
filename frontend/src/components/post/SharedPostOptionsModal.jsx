import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import DeleteSharedPost from './DeleteSharedPost';

/* this modal appears when we click on the "supprimer" in the post option modal,
 * the post props allows users to delete the right post
 * the modal state is handle in the SharedPostTemplate component thanks to the showModal props 
*/
const SharedPostOptionsModal = ({ showModal, post }) => {
    //deleteModal state defines if the modal for shared post deletion is visible or not
    const [deleteModal, setDeleteModal] = useState(null);

    return (
        <div className='more-options-modal' onClick={e => e.stopPropagation()}>
            <FontAwesomeIcon  icon={faXmark} aria-label='Fermer' className="remove-modal-icon" onClick={() => showModal(null)} />
            <p id='close-sharedModal' onClick={() => setDeleteModal(true)}>Supprimer</p>
            {deleteModal && <DeleteSharedPost showModal={setDeleteModal} post={post} />}

        </div>
    );
};

export default SharedPostOptionsModal;