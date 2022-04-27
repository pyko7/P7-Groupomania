import React from 'react';
import photo from "../assets/images/logo.png";
import useFetch from './useFetch';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment/min/moment-with-locales';
import Moment from 'react-moment';
import 'moment-timezone';
import Spinner from './Spinner';

// instances every 30 seconds.
Moment.startPooledTimer(30000);
// Sets the moment instance to use.
Moment.globalMoment = moment;
// Set the locale for every react-moment instance to French.
Moment.globalLocale = 'fr';


/*function gets all comments of the post*/
const UserComment = () => {
    const { id } = useParams();
    const { data: comment, isPending } = useFetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

    return (
        <div className='user-post'>
            <div className="user-comment" >
                {isPending && <Spinner />}
                {comment && <>
                    <div className="post-profile-picture">
                        <img src={photo} alt='photo de profil' />
                    </div>
                    <div className='user-post-right'>
                        <div className='user-post-content'>
                            <h1>{comment.userId}Jacques</h1>
                            <p>{comment.body}</p>
                            <span>Posté <Moment fromNow></Moment></span>
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
                </>}
            </div>
        </div>
    );
};

export default UserComment;