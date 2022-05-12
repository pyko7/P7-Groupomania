import React, { useState } from 'react';
import photo from "../assets/images/logo.png";
import useFetch from '../hooks/useFetch';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment/min/moment-with-locales';
import Moment from 'react-moment';
import 'moment-timezone';
import Spinner from './Spinner';
import LikeDislike from './LikeDislike';
import { Link } from 'react-router-dom';




// instances every 30 seconds.
Moment.startPooledTimer(30000);
// Sets the moment instance to use.
Moment.globalMoment = moment;
// Set the locale for every react-moment instance to French.
Moment.globalLocale = 'fr';


/*function gets all comments of the post*/
const UserComment = () => {
    const { id } = useParams();
    const { data: user, isPending } = useFetch(`https://jsonplaceholder.typicode.com/comments/${id}`);
    const [deleteModal, setDeleteModal] = useState(false);
    const [postId, setPostId] = useState(null);

    return (
        <>
            {isPending && <Spinner />}
            {user &&
                <article className="user-comment" >
                    <div className="post-profile-picture">
                        <img src={photo} alt='photo de profil' />
                    </div>
                    <div className='comment-content'>
                        <div className='comment-details'>
                            <h1>{user.name}</h1>
                            <p>{user.body}</p>
                            <br />
                            <span>Posté <Moment fromNow></Moment></span>
                        </div>
                        <div className="post-icons-container">
                            <LikeDislike />
                            {/* Link to post page + opening modal */}
                            <FontAwesomeIcon icon={faMessage} className="post-icons" />
                            <FontAwesomeIcon icon={faTrashCan} className="post-icons" />
                            {/* <FontAwesomeIcon icon={faTrashCan} className="post-icons"
                            onClick={() => { setDeleteModal(true); setPostId(post.id) }} /> */}
                            {/* {deleteModal && <DeletePost showModal={setDeleteModal} postId={postId} />} */}
                        </div>
                    </div>
                </article>
            }
        </>
    );
};

export default UserComment;