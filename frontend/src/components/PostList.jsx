import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment/min/moment-with-locales';
import Moment from 'react-moment';
import 'moment-timezone';
import photo from "../assets/images/logo.png";

// instances every 30 seconds.
Moment.startPooledTimer(30000);
// Sets the moment instance to use.
Moment.globalMoment = moment;
// Set the locale for every react-moment instance to French.
Moment.globalLocale = 'fr';


const PostList = (props) => {

    const posts = props.posts;

    return (
        <div className='posts-container'>
            {posts.map((post) => (
                <div className='user-post' key={post.id}>
                    <div className="post-profile-picture">
                        <img src={photo} alt='photo de profil' />
                    </div>
                    <div className='user-post-right'>
                        <div className='user-post-content'>
                            <h1>{post.userId + " Jean"}</h1>
                            <p>{post.body}</p>
                            <span>Posté <Moment fromNow></Moment> </span>
                        </div>
                        <div className="post-icons-container">
                            <div className="like-dislike-icons-container">
                                <FontAwesomeIcon icon={faThumbsUp} className="like-dislike-icons" />
                                <FontAwesomeIcon icon={faThumbsDown} className="like-dislike-icons" />
                            </div>
                            <i className="fa-solid fa-message"></i>
                            <i className="fa-solid fa-trash-can"></i>
                        </div>
                    </div>
                </div>
            ))
            }
        </div>

    );
};

export default PostList;