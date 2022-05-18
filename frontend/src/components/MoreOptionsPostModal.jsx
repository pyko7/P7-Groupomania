import React, { useState } from 'react';
import UpdatePostModal from './UpdatePostModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import DeletePost from './DeletePost';

const MoreOptionsModal = ({ showModal, postId }) => {
    const [updatePostModal, setUpdatePostModal] = useState(null);
    const [deleteModal, setDeleteModal] = useState(null);

    return (
        <div className='more-options-modal' onClick={e => e.stopPropagation()}>
            <FontAwesomeIcon icon={faXmark} className="remove-modal-icon" onClick={() => showModal(null)}/>
            <p id='update-post' onClick={() => setUpdatePostModal(true)}>Modifier</p>
            {updatePostModal && <UpdatePostModal showModal={setUpdatePostModal} postId={postId} />}
            <p onClick={() => setDeleteModal(true)}>Supprimer</p>
            {deleteModal && <DeletePost showModal={setDeleteModal} postId={postId} />}
            
        </div>
    );
};

export default MoreOptionsModal;