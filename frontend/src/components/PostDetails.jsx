import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useFetch from './useFetch';
import Spinner from './Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment/min/moment-with-locales';
import Moment from 'react-moment';
import 'moment-timezone';
import photo from "../assets/images/logo.png";
import Header from './Header';
import UserComment from './UserComment';
import CreateCommentModal from './CreateCommentModal';
import DeletePost from './DeletePost';
import LikeDislike from './LikeDislike';

// instances every 30 seconds.
Moment.startPooledTimer(30000);
// Sets the moment instance to use.
Moment.globalMoment = moment;
// Set the locale for every react-moment instance to French.
Moment.globalLocale = 'fr';


const PostDetails = () => {
    /*Get post*/
    const { id } = useParams();
    const { data: post, isPending } = useFetch("https://jsonplaceholder.typicode.com/posts/" + id);

    const navigate = useNavigate();
    /*Defines state to show/hide comment modal*/
    const [commentModal, setCommentModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    return (
        <div>
            <Header />
            <main>
                <div className='main-container'>
                    <div className='user-post' >
                        {isPending && <Spinner />}

                        {post && <>
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
                                    <LikeDislike />
                                    <FontAwesomeIcon icon={faMessage} className="post-icons" />
                                    {commentModal && <CreateCommentModal showModal={setCommentModal} />}
                                    <FontAwesomeIcon icon={faTrashCan} className="post-icons" onClick={() => setDeleteModal(true)} />
                                    {deleteModal && <DeletePost showModal={setDeleteModal} />}
                                </div>
                            </div>
                        </>}
                    </div>
                    <div className="comments-container">
                        < UserComment />
                        < UserComment />
                        < UserComment />
                    </div>
                </div>
            </main>
        </div>

    );
};

export default PostDetails;