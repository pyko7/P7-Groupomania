import React, { useState } from 'react';
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
import CreateCommentModal from './CreateCommentModal';
import DeleteComment from './DeleteComment';
import LikeDislike from './LikeDislike';



// instances every 30 seconds.
Moment.startPooledTimer(30000);
// Sets the moment instance to use.
Moment.globalMoment = moment;
// Set the locale for every react-moment instance to French.
Moment.globalLocale = 'fr';


/*function gets all comments of the post*/
const UserComment = () => {
    const { id } = useParams();
    const [commentModal, setCommentModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const { data: comment, isPending } = useFetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

    return (
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
                        <LikeDislike />
                        <i className="fa-solid fa-message" onClick={() => setCommentModal(true)}></i>
                        {commentModal && <CreateCommentModal showModal={setCommentModal} />}
                        <i className="fa-solid fa-trash-can" onClick={() => setDeleteModal(true)}></i>
                        {deleteModal && <DeleteComment showModal={setDeleteModal} />}

                    </div>
                </div>
            </>}
        </div>
    );
};

export default UserComment;