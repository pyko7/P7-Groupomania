import React, { useState } from 'react';
import UpdatePostModal from './UpdatePostModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import DeleteSharedPost from './DeleteSharedPost';

const SharedPostOptionsModal = ({ showModal, post }) => {
    const [deleteModal, setDeleteModal] = useState(null);

    return (
        <div className='more-options-modal' onClick={e => e.stopPropagation()}>
            <FontAwesomeIcon icon={faXmark} aria-label='Fermer' className="remove-modal-icon" onClick={() => showModal(null)} />
            <p onClick={() => setDeleteModal(true)}>Supprimer</p>
            {deleteModal && <DeleteSharedPost showModal={setDeleteModal} post={post} />}

        </div>
    );
};

export default SharedPostOptionsModal;