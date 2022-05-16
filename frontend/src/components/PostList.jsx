import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment/min/moment-with-locales';
import Moment from 'react-moment';
import 'moment-timezone';
import UserComment from './UserComment'
import CreateCommentModal from './CreateCommentModal';
import DeletePost from './DeletePost';
import LikeDislike from './LikeDislike';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { faShare } from '@fortawesome/free-solid-svg-icons';


// instances every 30 seconds.
Moment.startPooledTimer(30000);
// Sets the moment instance to use.
Moment.globalMoment = moment;
// Set the locale for every react-moment instance to French.
Moment.globalLocale = 'fr';


const PostList = ({ posts }) => {
    const [deleteModal, setDeleteModal] = useState(false);
    const [commentModal, setCommentModal] = useState(false)
    const [postId, setPostId] = useState(null);

    return (
        <div className='posts-container'>
            {posts.map((post) => (
                <div className='post-comments-container'>
                    <article className='user-post' key={post.id}>
                        <div className="post-profile-picture">
                            <img src={post.author.profilePicture} alt='photo de profil' />
                        </div>
                        <div className='user-content'>
                            <Link to={`/posts/${post.id}`}>
                                <div className='post-details'>
                                    <h1>{post.author.firstName} {post.author.lastName}</h1>
                                    <p>{post.textContent}</p>
                                    {post.imageUrl && <div className="image-container">
                                        <img src={post.imageUrl}
                                            alt={`posté par ${post.author.firstName} ${post.author.lastName} `} />
                                    </div>}
                                    <br />
                                    <span>Posté <Moment fromNow>{post.createdAt}</Moment> </span>
                                </div>
                            </Link>
                            <div className="post-icons-container">
                                <LikeDislike />
                                {/* Link to post page + opening modal */}
                                <FontAwesomeIcon icon={faMessage} className="post-icons" onClick={() => { setCommentModal(true); setPostId(post.id) }} />
                                {commentModal && <CreateCommentModal showModal={setCommentModal} postId={postId} />}
                                <FontAwesomeIcon icon={faTrashCan} className="post-icons"
                                    onClick={() => { setDeleteModal(true); setPostId(post.id) }} />
    
                                {/* If post creator show delete icon, else show share icon */}
                                {deleteModal && <DeletePost showModal={setDeleteModal} postId={postId} />}
                                <FontAwesomeIcon icon={faShare} className="post-icons" />
                            </div>
                        </div>
                    </article>
                    <div className="comments-container">
                        <UserComment />
                    </div>
                </div>
            ))}
        </div>

    );
};

export default PostList;
