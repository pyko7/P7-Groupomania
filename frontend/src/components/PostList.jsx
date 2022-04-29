import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment/min/moment-with-locales';
import Moment from 'react-moment';
import 'moment-timezone';
import photo from "../assets/images/logo.png";
import DeletePost from './DeletePost';
import LikeDislike from './LikeDislike';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';

// instances every 30 seconds.
Moment.startPooledTimer(30000);
// Sets the moment instance to use.
Moment.globalMoment = moment;
// Set the locale for every react-moment instance to French.
Moment.globalLocale = 'fr';


const PostList = ({posts}) => {
    const [deleteModal, setDeleteModal] = useState(false);
    const [commentModal, setCommentModal] = useState(false);


    return (
        <div className='posts-container'>
            {posts.map((post) => (
                <div className='user-post' key={post.id}>
                    <div className="post-profile-picture">
                        <img src={photo} alt='photo de profil' />
                    </div>
                    <div className='user-post-right'>
                        <Link to={`/posts/${post.id}`}>
                            <div className='user-post-content'>
                                <h1>{post.userId + " Jean"}</h1>
                                <p>{post.body}</p>
                                <span>Posté <Moment fromNow></Moment> </span>
                            </div>
                        </Link>
                        <div className="post-icons-container">
                            <LikeDislike />
                            {/* Link to post page + opening modal */}
                            <Link to={`/posts/${post.id}`}>
                                <FontAwesomeIcon icon={faMessage} className="post-icons" />
                            </Link>
                            <FontAwesomeIcon icon={faTrashCan} className="post-icons" onClick={() => setDeleteModal(true)} />
                            {deleteModal && <DeletePost showModal={setDeleteModal} />}
                        </div>
                    </div>
                </div>
            ))
            }
        </div>

    );
};

export default PostList;