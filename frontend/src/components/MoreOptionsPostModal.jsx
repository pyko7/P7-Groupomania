import React, { useState } from 'react';
import UpdatePostModal from './UpdatePostModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import DeletePost from './DeletePost';

const MoreOptionsModal = ({ showModal, post }) => {
    const [updatePostModal, setUpdatePostModal] = useState(null);
    const [deleteModal, setDeleteModal] = useState(null);

    return (
        <div className='more-options-modal' onClick={e => e.stopPropagation()}>
            <FontAwesomeIcon icon={faXmark} aria-label='Fermer' className="remove-modal-icon" onClick={() => showModal(null)}/>
            <p id='update-post' onClick={() => setUpdatePostModal(true)}>Modifier</p>
            {updatePostModal && <UpdatePostModal showModal={setUpdatePostModal} post={post} />}
            <p onClick={() => setDeleteModal(true)}>Supprimer</p>
            {deleteModal && <DeletePost showModal={setDeleteModal} post={post} />}
            
        </div>
    );
};

export default MoreOptionsModal;