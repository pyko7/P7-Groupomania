import React, { useState } from 'react';
import moment from 'moment/min/moment-with-locales';
import Moment from 'react-moment';
import 'moment-timezone';
import photo from "../assets/images/logo.png";
import { Link } from 'react-router-dom';
import DeletePost from './DeletePost';
import LikeDislike from './LikeDislike';

// instances every 30 seconds.
Moment.startPooledTimer(30000);
// Sets the moment instance to use.
Moment.globalMoment = moment;
// Set the locale for every react-moment instance to French.
Moment.globalLocale = 'fr';


const PostList = (props) => {
    const posts = props.posts;
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
                                <i className="fa-solid fa-message"></i>
                            </Link>
                            <i className="fa-solid fa-trash-can" onClick={() => setDeleteModal(true)}></i>
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