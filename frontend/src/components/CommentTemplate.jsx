import React, { useState } from 'react';
import { decodeToken } from "react-jwt";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faMessage, faCircle } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment/min/moment-with-locales';
import Moment from 'react-moment';
import 'moment-timezone';
import CreateCommentModal from './CreateCommentModal';
import MoreOptionsCommentModal from './MoreOptionsCommentModal';
import DeleteComment from './DeleteComment';


// instances every 30 seconds.
Moment.startPooledTimer(30000);
// Sets the moment instance to use.
Moment.globalMoment = moment;
// Set the locale for every react-moment instance to French.
Moment.globalLocale = 'fr';

/*function gets all comments of the post*/
const CommentTemplate = ({ postId, comment }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user.userId;
    const token = user.token
    const decodedToken = decodeToken(token)
    const userRole = decodedToken.role
    const [deleteModal, setDeleteModal] = useState(null);
    const [commentModal, setCommentModal] = useState(null);
    const [moreOptionsModal, setMoreOptionsModal] = useState(null);
    return (
        <>
            <article className="user-comment">
                <div className="post-profile-picture">
                    <img src={comment.author.profilePicture} alt='photo de profil' />
                </div>
                <div className='comment-content'>
                    {(userId === comment.author.id) || (userRole === 1) ? <div className="more-options" onClick={() => setMoreOptionsModal(true)} >
                        <FontAwesomeIcon icon={faCircle} aria-label='ouvrir options' className="more-dots" />
                        <FontAwesomeIcon icon={faCircle} aria-label='ouvrir options' className="more-dots" />
                        <FontAwesomeIcon icon={faCircle} aria-label='ouvrir options' className="more-dots" />
                    </div> : null}
                    {moreOptionsModal && <MoreOptionsCommentModal showModal={setMoreOptionsModal} comment={comment} />}
                    <div className='comment-details'>
                        <h1>{comment.author.firstName} {comment.author.lastName}</h1>
                        <p>{comment.textContent}</p>
                        <br />
                        <span>Posté <Moment fromNow>{comment.createdAt}</Moment></span>
                        <br />
                        {comment.updatedAt !== comment.createdAt ? <span>Modifié <Moment fromNow>{comment.updatedAt}</Moment> </span> : null}

                    </div>
                    <div className="post-icons-container">
                        <FontAwesomeIcon icon={faMessage} className="post-icons" aria-label='Commenter' onClick={() => setCommentModal(true)} />
                        {commentModal && <CreateCommentModal showModal={setCommentModal} postId={postId} />}
                        {userId === comment.author.id ?
                            <>
                                <FontAwesomeIcon icon={faTrashCan} aria-label='Supprimer' className="post-icons"
                                    onClick={() => { setDeleteModal(true); setPostId(comment.id) }} />
                                {deleteModal && <DeleteComment showModal={setDeleteModal} comment={comment} />}
                            </>
                            : null}
                    </div>
                </div>
            </article>
        </>
    );
};

export default CommentTemplate;