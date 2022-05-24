import React, { useState } from 'react';
import moment from 'moment/min/moment-with-locales';
import Moment from 'react-moment';
import 'moment-timezone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faShare, faCircle } from '@fortawesome/free-solid-svg-icons';
import CommentTemplate from './CommentTemplate'
import CreateCommentModal from './CreateCommentModal';
import MoreOptionsPostModal from './MoreOptionsPostModal';
import { Link } from 'react-router-dom';
import SharePostModal from './SharePostModal';
import SharedPostTemplate from './SharedPostTemplate';

// instances every 30 seconds.
Moment.startPooledTimer(30000);
// Sets the moment instance to use.
Moment.globalMoment = moment;
// Set the locale for every react-moment instance to French.
Moment.globalLocale = 'fr';


const PostTemplate = ({ post }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user.userId;
    const [commentModal, setCommentModal] = useState(null);
    const [moreOptionsModal, setMoreOptionsModal] = useState(null);
    const [sharePostModal, setSharePostModal] = useState(null);
    const originalPostId = post.originalPostId
    const comments = post.comments;

    console.log(post);
    return (
        <div className='post-comment-container'>
            {originalPostId ? <SharedPostTemplate post={post} /> :
                <>
                    <article className='user-post'>
                        <div className="post-profile-picture">
                            <img src={post.author.profilePicture} alt='photo de profil' />
                        </div>
                        <div className='user-content'>
                            {userId === post.authorId ? <div className="more-options" onClick={() => setMoreOptionsModal(true)} >
                                <FontAwesomeIcon icon={faCircle} aria-label='Ouvrir options' className="more-dots" />
                                <FontAwesomeIcon icon={faCircle} aria-label='Ouvrir options' className="more-dots" />
                                <FontAwesomeIcon icon={faCircle} aria-label='Ouvrir options' className="more-dots" />
                            </div> : null}
                            {moreOptionsModal && <MoreOptionsPostModal showModal={setMoreOptionsModal} post={post} />}
                            <Link to={`/posts/${post.id}`} >
                                <div className='post-details'>
                                    <h1>{post.author.firstName} {post.author.lastName}</h1>
                                    <p>{post.textContent}</p>
                                    {post.imageUrl && <div className="image-container">
                                        <img src={post.imageUrl}
                                            alt={`posté par ${post.author.firstName} ${post.author.lastName} `} />
                                    </div>}
                                    <br />
                                    <span>Posté <Moment fromNow>{post.createdAt}</Moment> </span>
                                    <br />
                                    {post.updatedAt !== post.createdAt ? <span>Modifié <Moment fromNow>{post.updatedAt}</Moment> </span> : null}

                                </div>
                            </Link>
                            <div className="post-icons-container">
                                <FontAwesomeIcon icon={faMessage} aria-label='Commenter' className="post-icons" onClick={() => setCommentModal(true)} />
                                {commentModal && <CreateCommentModal showModal={setCommentModal} postId={post.id} />}
                                <FontAwesomeIcon icon={faShare} aria-label='Partager' className="post-icons" onClick={() => setSharePostModal(true)} />
                                {sharePostModal && <SharePostModal showModal={setSharePostModal} post={post} />}

                            </div>
                        </div>
                    </article>
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