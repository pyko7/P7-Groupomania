import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faMessage, faCircle } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment/min/moment-with-locales';
import Moment from 'react-moment';
import 'moment-timezone';
import LikeDislike from './LikeDislike';
import MoreOptionsCommentModal from './MoreOptionsCommentModal';
import DeleteComment from './DeleteComment';


// instances every 30 seconds.
Moment.startPooledTimer(30000);
// Sets the moment instance to use.
Moment.globalMoment = moment;
// Set the locale for every react-moment instance to French.
Moment.globalLocale = 'fr';

/*function gets all comments of the post*/
const CommentTemplate = ({ comment }) => {
    const [deleteModal, setDeleteModal] = useState(null);
    const [moreOptionsModal, setMoreOptionsModal] = useState(null);

    return (
        <>
            <article className="user-comment">
                <div className="post-profile-picture">
                    <img src={comment.author.profilePicture} alt='photo de profil' />
                </div>
                <div className='comment-content'>
                    <div className="more-options" onClick={() => setMoreOptionsModal(true)} >
                        <FontAwesomeIcon icon={faCircle} className="more-dots" />
                        <FontAwesomeIcon icon={faCircle} className="more-dots" />
                        <FontAwesomeIcon icon={faCircle} className="more-dots" />
                    </div>
                    {moreOptionsModal && <MoreOptionsCommentModal showModal={setMoreOptionsModal} commentId={comment.id} />}
                    <div className='comment-details'>
                        <h1>{comment.author.firstName} {comment.author.lastName}</h1>
                        <p>{comment.textContent}</p>
                        <br />
                        <span>Posté <Moment fromNow>{comment.createdAt}</Moment></span>
                        <br />
                        {comment.updatedAt !== comment.createdAt ? <span>Modifié <Moment fromNow>{comment.updatedAt}</Moment> </span> : null}

                    </div>
                    <div className="post-icons-container">
                        <LikeDislike />
                        {/* Link to post page + opening modal */}
                        <FontAwesomeIcon icon={faMessage} className="post-icons" />
                        <FontAwesomeIcon icon={faTrashCan} className="post-icons"
                            onClick={() => { setDeleteModal(true); setPostId(comment.id) }} />
                        {deleteModal && <DeleteComment showModal={setDeleteModal} commentId={comment.id} />}
                    </div>
                </div>
            </article>
        </>
    );
};

export default CommentTemplate;