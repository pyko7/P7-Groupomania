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
import PostTemplate from './PostList';

const SharedPostTemplate = ({ post, sharedPost }) => {
    const [commentModal, setCommentModal] = useState(null);
    const [moreOptionsModal, setMoreOptionsModal] = useState(null);
    const user = sharedPost.author
    return (
        <article className='user-post'>
            <div className="post-profile-picture">
                <img src={user.profilePicture} alt='photo de profil' />
            </div>
            <div className='user-content'>
                <span id="sharedBy"> Partagé par {user.firstName} {user.lastName}</span>
                <div className="more-options" onClick={() => setMoreOptionsModal(true)} >
                    <FontAwesomeIcon icon={faCircle} className="more-dots" />
                    <FontAwesomeIcon icon={faCircle} className="more-dots" />
                    <FontAwesomeIcon icon={faCircle} className="more-dots" />
                </div>

                <article className='user-post user-post-shared'>
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

                <div className="post-details">
                    <span>Posté <Moment fromNow>{post.createdAt}</Moment> </span>
                </div>
            </div>
        </article>
    );
};

export default SharedPostTemplate;