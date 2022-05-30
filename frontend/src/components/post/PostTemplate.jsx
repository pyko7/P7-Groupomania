import React, { useState } from 'react';
import moment from 'moment/min/moment-with-locales';
import Moment from 'react-moment';
import 'moment-timezone';
import { Link } from 'react-router-dom';
import { decodeToken } from "react-jwt";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faShare, faCircle } from '@fortawesome/free-solid-svg-icons';
import CommentTemplate from '../comment/CommentTemplate'
import CreateCommentModal from '../comment/CreateCommentModal';
import MoreOptionsPostModal from './MoreOptionsPostModal';
import SharePostModal from './SharePostModal';
import SharedPostTemplate from './SharedPostTemplate';
import Like from '../like/Like';

// instances every 30 seconds.
Moment.startPooledTimer(30000);
// Sets the moment instance to use.
Moment.globalMoment = moment;
// Set the locale for every react-moment instance to French.
Moment.globalLocale = 'fr';

/* this component defines the template of a post displayed in the post list 
 * as well as a post displayed in it's own page (/posts/:id)
 * the post props is used to display datas, it refers to a single post
*/
const PostTemplate = ({ post }) => {
    /*user datas*/
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user.userId;
    const token = user.token
    const decodedToken = decodeToken(token)
    const userRole = decodedToken.role
    /*modals states*/
    const [commentModal, setCommentModal] = useState(null);
    const [moreOptionsModal, setMoreOptionsModal] = useState(null);
    const [sharePostModal, setSharePostModal] = useState(null);


    /*post details*/
    const originalPostId = post.originalPostId
    const comments = post.comments;

    return (
        <div className='post-comment-container'>
            {originalPostId ? <SharedPostTemplate post={post} /> :
                <>
                    <article className='user-post'>
                        <div className="post-profile-picture">
                            <img src={post.author.profilePicture} alt='photo de profil' />
                        </div>

                        <div className='user-content'>
                            {/* if user isn't the author of the post or isn't admin, he can't access to option modal*/}
                            {(userId === post.authorId) || (userRole === 1) ? <div className="more-options" onClick={() => setMoreOptionsModal(true)} >
                                <FontAwesomeIcon icon={faCircle} aria-label='Ouvrir options' className="more-dots" />
                                <FontAwesomeIcon icon={faCircle} aria-label='Ouvrir options' className="more-dots" />
                                <FontAwesomeIcon icon={faCircle} aria-label='Ouvrir options' className="more-dots" />
                            </div> : null}
                            {moreOptionsModal && <MoreOptionsPostModal showModal={setMoreOptionsModal} post={post} />}
                            <div className='post-details'>
                                <h1>{post.author.firstName} {post.author.lastName}</h1>
                                <Link to={`/posts/${post.id}`} >
                                    <p>{post.textContent}</p>
                                    {post.imageUrl && <div className="image-container">
                                        <img src={post.imageUrl}
                                            alt={`posté par ${post.author.firstName} ${post.author.lastName} `} />
                                    </div>}
                                </Link>
                                <br />
                                <span>Posté <Moment fromNow>{post.createdAt}</Moment> </span>
                                <br />
                                {post.updatedAt !== post.createdAt ? <span>Modifié <Moment fromNow>{post.updatedAt}</Moment> </span> : null}

                            </div>
                            <div className="post-icons-container">
                                <Like post={post} userId={userId} />
                                <FontAwesomeIcon icon={faMessage} aria-label='Commenter' className="post-icons" onClick={() => setCommentModal(true)} />
                                {commentModal && <CreateCommentModal showModal={setCommentModal} postId={post.id} />}
                                <FontAwesomeIcon icon={faShare} aria-label='Partager' className="post-icons" onClick={() => setSharePostModal(true)} />
                                {sharePostModal && <SharePostModal showModal={setSharePostModal} post={post} />}

                            </div>
                        </div>
                    </article>
                    {/* this div represents the comment section of a post
                        each comment is mapped and displayed within this div
                        the comment props refers to a single comment
                    */}
                    <div className="comments-container">
                        {comments.map((comment) => (
                            <CommentTemplate postId={post.id} comment={comment} key={comment.id} />
                        ))}
                    </div>
                </>
            }
        </div >
    );
};

export default PostTemplate;