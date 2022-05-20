import React, { useState } from 'react';
import UpdateCommentModal from './UpdateCommentModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import DeleteComment from './DeleteComment';

const MoreOptionsModal = ({ showModal, commentId }) => {
    const [updateModal, setUpdateModal] = useState(null);
    const [deleteModal, setDeleteModal] = useState(null);

    return (
        <div className='more-options-modal' onClick={e => e.stopPropagation()}>
            <FontAwesomeIcon icon={faXmark} aria-label='Fermer' className="remove-modal-icon" onClick={() => showModal(null)}/>
            <p id='update-post' onClick={() => setUpdateModal(true)}>Modifier</p>
            {updateModal && <UpdateCommentModal showModal={setUpdateModal} commentId={commentId} />}
            <p onClick={() => setDeleteModal(true)}>Supprimer</p>
            {deleteModal && <DeleteComment showModal={setDeleteModal} commentId={commentId} />}
            
        </div>
    );
};

export default MoreOptionsModal;