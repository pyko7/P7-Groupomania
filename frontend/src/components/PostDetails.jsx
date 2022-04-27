import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useFetch from './useFetch';
import Spinner from './Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment/min/moment-with-locales';
import Moment from 'react-moment';
import 'moment-timezone';
import photo from "../assets/images/logo.png";
import Header from './Header';
import UserComment from './UserComment';
import CommentModal from './CommentModal';

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
    const [show, setShow] = useState(false);

    /*function delete a post*/
    const deletePost = async () => {
        /*Get ID for posts deletion*/
        const settings = { method: "DELETE" };
        try {
            const res = await fetch("https://jsonplaceholder.typicode.com/posts/" + id, settings);
            const data = await res.json();
            if (!res.ok) throw error;
            console.log("ok");
            navigate("/");
            return data;
        } catch (error) {
            return error;
        }
    }

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
                                    <div className="like-dislike-icons-container">
                                        <FontAwesomeIcon icon={faThumbsUp} className="like-dislike-icons" />
                                        <FontAwesomeIcon icon={faThumbsDown} className="like-dislike-icons" />
                                    </div>
                                    <i className="fa-solid fa-message" onClick={() => setShow(true)}></i>
                                    <CommentModal onClose={() => setShow(false)} onSubmit={() => setShow(false)} show={show} />
                                    <i className="fa-solid fa-trash-can" onClick={deletePost}></i>
                                </div>
                            </div>
                        </>}
                    </div>
                    {/* < UserComment /> */}
                </div>
            </main>
        </div>

    );
};

export default PostDetails;