import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment/min/moment-with-locales';
import Moment from 'react-moment';
import 'moment-timezone';
import DeletePost from './DeletePost';
import LikeDislike from './LikeDislike';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import UserComment from './UserComment'
import useFetch from '../hooks/useFetch';

// instances every 30 seconds.
Moment.startPooledTimer(30000);
// Sets the moment instance to use.
Moment.globalMoment = moment;
// Set the locale for every react-moment instance to French.
Moment.globalLocale = 'fr';


const PostList = ({ posts }) => {
    const [deleteModal, setDeleteModal] = useState(false);
    const [postId, setPostId] = useState(null);

    return (
        <div className='posts-container'>
            {posts.map((post) => (
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
                            <Link to={`/posts/${post.id}`}>
                                <FontAwesomeIcon icon={faMessage} className="post-icons" />
                            </Link>
                            <FontAwesomeIcon icon={faTrashCan} className="post-icons"
                                onClick={() => { setDeleteModal(true); setPostId(post.id) }} />
                            {deleteModal && <DeletePost showModal={setDeleteModal} postId={postId} />}
                        </div>
                    </div>
                </article>
            ))}
        </div>

    );
};

export default PostList;
