import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment/min/moment-with-locales';
import Moment from 'react-moment';
import 'moment-timezone';
import photo from "../assets/images/logo.png";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

// instances every 30 seconds.
Moment.startPooledTimer(30000);
// Sets the moment instance to use.
Moment.globalMoment = moment;
// Set the locale for every react-moment instance to French.
Moment.globalLocale = 'fr';


const PostList = (props) => {
    const { id } = useParams();
    const posts = props.posts;

    /*function delete a post*/
    const handleClick = async () => {
        /*Get ID for posts deletion*/
        const settings = { method: "DELETE" };
        try {
            const res = await fetch(
                "https://jsonplaceholder.typicode.com/posts/" + id, settings);
            const data = await res.json();
            if (!res.ok) throw error;
            console.log("ok");
            return data;
        } catch (error) {
            console.log("aps bon");
            return error;
        }
    }


    return (
        <div className='posts-container'>
            {posts.map((post) => (
                <div className='user-post' key={post.id}>
                    <div className="post-profile-picture">
                        <img src={photo} alt='photo de profil' />
                    </div>
                    <Link to={`/posts/${post.id}`}>
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
                                <i className="fa-solid fa-trash-can" onClick={handleClick}></i>
                            </div>
                        </div>
                    </Link>
                </div>
            ))
            }
        </div>

    );
};

export default PostList;