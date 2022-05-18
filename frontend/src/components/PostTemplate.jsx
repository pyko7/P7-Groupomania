import React, { useState } from 'react';
import moment from 'moment/min/moment-with-locales';
import Moment from 'react-moment';
import 'moment-timezone';
import CommentTemplate from './CommentTemplate'
import CreateCommentModal from './CreateCommentModal';
import DeletePost from './DeletePost';
import LikeDislike from './LikeDislike';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import MoreOptionsPostModal from './MoreOptionsPostModal';
import useFetch from '../hooks/useFetch';
import { Link } from 'react-router-dom';

// instances every 30 seconds.
Moment.startPooledTimer(30000);
// Sets the moment instance to use.
Moment.globalMoment = moment;
// Set the locale for every react-moment instance to French.
Moment.globalLocale = 'fr';


const PostTemplate = ({ post }) => {
    const [commentModal, setCommentModal] = useState(null);
    const [moreOptionsModal, setMoreOptionsModal] = useState(null);
    const comments = post.comments;
    return (
        <div className='post-comment-container'>
            <article className='user-post'>
                <div className="post-profile-picture">
                    <img src={post.author.profilePicture} alt='photo de profil' />
                </div>
                <div className='user-content'>
                    <div className="more-options" onClick={() => setMoreOptionsModal(true)} >
                        <FontAwesomeIcon icon={faCircle} className="more-dots" />
                        <FontAwesomeIcon icon={faCircle} className="more-dots" />
                        <FontAwesomeIcon icon={faCircle} className="more-dots" />
                    </div>
                    {moreOptionsModal && <MoreOptionsPostModal showModal={setMoreOptionsModal} postId={post.id} />}
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
                        <LikeDislike />
                        {/* Link to post page + opening modal */}
                        <FontAwesomeIcon icon={faMessage} className="post-icons" onClick={() => setCommentModal(true)} />
                        {commentModal && <CreateCommentModal showModal={setCommentModal} postId={post.id} />}

                        <FontAwesomeIcon icon={faShare} className="post-icons" />
                    </div>
                </div>
            </article>
            <div className="comments-container">
                {comments.map((comment) => (
                    <CommentTemplate comment={comment} key={comment.id} />
                ))}
            </div>

        </div>

    );
};

export default PostTemplate;