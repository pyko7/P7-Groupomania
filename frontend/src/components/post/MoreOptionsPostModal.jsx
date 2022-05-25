import React, { useState } from 'react';
import UpdatePostModal from './UpdatePostModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import DeletePostModal from './DeletePostModal';

/* this modal appears when we click on the "supprimer" in the post option modal,
 * the post props allows users to update or delete the right post
 * the modal state is handle in the MoreOptionsPostModal component thanks to the showModal props
*/
const MoreOptionsModal = ({ showModal, post }) => {
    //updateModal state defines if the modal for post updating is visible or not
    const [updatePostModal, setUpdatePostModal] = useState(null);
    //deleteModal state defines if the modal for post deletion is visible or not
    const [deleteModal, setDeleteModal] = useState(null);

    return (
        <div className='more-options-modal' onClick={e => e.stopPropagation()}>
            <FontAwesomeIcon icon={faXmark} aria-label='Fermer' className="remove-modal-icon" onClick={() => showModal(null)} />
            <p id='update-post' onClick={() => setUpdatePostModal(true)}>Modifier</p>
            {updatePostModal && <UpdatePostModal showModal={setUpdatePostModal} post={post} />}
            <p onClick={() => setDeleteModal(true)}>Supprimer</p>
            {deleteModal && <DeletePostModal showModal={setDeleteModal} post={post} />}

        </div>
    );
};

export default MoreOptionsModal;