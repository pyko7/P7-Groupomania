import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from './Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment/min/moment-with-locales';
import Moment from 'react-moment';
import 'moment-timezone';
import Header from './Header';
import UserComment from './UserComment';
import CreateCommentModal from './CreateCommentModal';
import DeletePost from './DeletePost';
import LikeDislike from './LikeDislike';
import useFetch from '../hooks/useFetch';


// instances every 30 seconds.
Moment.startPooledTimer(30000);
// Sets the moment instance to use.
Moment.globalMoment = moment;
// Set the locale for every react-moment instance to French.
Moment.globalLocale = 'fr';


const PostDetails = () => {
    const { id } = useParams()
    const { data: post, isPending } = useFetch(`http://localhost:3000/api/posts/${id}`)

    /*Defines state to show/hide comment modal*/
    const [deleteModal, setDeleteModal] = useState(false);
    const [postId, setPostId] = useState(null);

    return (
        <div>
            <Header />
            <main>
                {post &&
                    <div className='main-container'>
                        <article className='user-post' key={post.id}>
                            {isPending && <Spinner />}
                            <div className="post-profile-picture">
                                <img src={post.author.profilePicture} alt='photo de profil' />
                            </div>
                            <div className='user-content'>
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
                                <div className="post-icons-container">
                                    <LikeDislike />
                                    <FontAwesomeIcon icon={faMessage} className="post-icons" />
                                    {/* {commentModal && <CreateCommentModal showModal={setCommentModal} />} */}
                                    <FontAwesomeIcon icon={faTrashCan} className="post-icons"
                                        onClick={() => { setDeleteModal(true); setPostId(post.id) }} />
                                    {deleteModal && <DeletePost showModal={setDeleteModal} postId={postId} />}
                                </div>
                            </div>
                        </article>
                        <div className="comments-container">
                            <UserComment />
                            <UserComment />
                        </div>
                    </div>
                }
            </main>
        </div>

    );
};

export default PostDetails;