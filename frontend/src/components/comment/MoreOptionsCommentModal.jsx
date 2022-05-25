import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import UpdateCommentModal from './UpdateCommentModal'
import DeleteCommentModal from './DeleteCommentModal';

/* this modal appears when we click on the dots icon in a comment,
 * it allows users to update or delete their comment
 * the comment props allows users to update or delete the right comment
 * the modal state is handle in the CommentTemplate component thanks to the showModal props
*/
const MoreOptionsModal = ({ showModal, comment }) => {
    //updateModal state defines if the modal for comment updating is visible or not
    const [updateModal, setUpdateModal] = useState(null);
    //deleteModal state defines if the modal for comment deletion is visible or not
    const [deleteModal, setDeleteModal] = useState(null);

    return (
        <div className='more-options-modal' onClick={e => e.stopPropagation()}>
            <FontAwesomeIcon icon={faXmark} aria-label='Fermer' className="remove-modal-icon" onClick={() => showModal(null)} />
            <p id='update-post' onClick={() => setUpdateModal(true)}>Modifier</p>
            {updateModal && <UpdateCommentModal showModal={setUpdateModal} comment={comment} />}
            <p onClick={() => setDeleteModal(true)}>Supprimer</p>
            {deleteModal && <DeleteCommentModal showModal={setDeleteModal} comment={comment} />}

        </div>
    );
};

export default MoreOptionsModal;

