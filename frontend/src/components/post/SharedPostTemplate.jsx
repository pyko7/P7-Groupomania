import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import { Link } from 'react-router-dom';
import { decodeToken } from "react-jwt";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faShare, faCircle } from '@fortawesome/free-solid-svg-icons';
import CreateCommentModal from '../comment/CreateCommentModal';
import MoreOptionsPostModal from './MoreOptionsPostModal';
import SharedPostOptionsModal from './SharedPostOptionsModal';
import useFetch from '../../hooks/useFetch';
import SharePostModal from './SharePostModal';
import Like from '../like/Like';


/* this component defines the template of a shared post displayed in the post list 
 * the post props refers to the post
 * we fetch the datas of the original post thanks to the originalPostId parameter
 * originalPostId refers to the id of the shared post
*/
const SharedPostTemplate = ({ post }) => {
    /*user datas*/
    const userData = JSON.parse(localStorage.getItem('user'));
    const userId = userData.userId;
    const token = userData.token
    const decodedToken = decodeToken(token)
    const userRole = decodedToken.role
    /*original post (=shared post)*/
    const originalPostId = post.originalPostId
    const user = post.author
    const { data: originalPost } = useFetch(`http://localhost:3000/api/posts/${originalPostId}`)
    /*modals states*/
    const [commentModal, setCommentModal] = useState(null);
    const [moreOptionsModal, setMoreOptionsModal] = useState(null);
    const [sharedPostOptions, setSharedPostOptions] = useState(null);
    const [sharePostModal, setSharePostModal] = useState(null);
    const [likesCount, setLikesCount] = useState()

    return (
        <>
            {originalPost &&
                <article className='user-post'>
                    <div className="post-profile-picture">
                        <img src={user.profilePicture} alt='photo de profil' />
                    </div>
                    <div className='user-content'>
                        <span id="sharedBy"> Partagé par {user.firstName} {user.lastName}</span>
                        {/* if user isn't the author of the post or isn't admin, he can't access to option modal*/}
                        {(userId === user.id) || (userRole === 1) ?
                            <div className="more-options" onClick={() => setSharedPostOptions(true)} >
                                <FontAwesomeIcon icon={faCircle} aria-label='Ouvrir options' className="more-dots" />
                                <FontAwesomeIcon icon={faCircle} aria-label='Ouvrir options' className="more-dots" />
                                <FontAwesomeIcon icon={faCircle} aria-label='Ouvrir options' className="more-dots" />
                            </div>
                            : null}
                        {sharedPostOptions && <SharedPostOptionsModal showModal={setSharedPostOptions} post={post} />}


                        <article className='user-post user-post-shared'>
                            <div className="post-profile-picture">
                                <img src={originalPost.author.profilePicture} alt='photo de profil' />
                            </div>
                            <div className='user-content'>
                                {/* if user isn't the author of the shared post or isn't admin, he can't access to option modal*/}
                                {userId === originalPost.author.id || (userRole === 1) ?
                                    <div className="more-options" onClick={() => setMoreOptionsModal(true)} >
                                        <FontAwesomeIcon icon={faCircle} aria-label='Ouvrir options' className="more-dots" />
                                        <FontAwesomeIcon icon={faCircle} aria-label='Ouvrir options' className="more-dots" />
                                        <FontAwesomeIcon icon={faCircle} aria-label='Ouvrir options' className="more-dots" />
                                    </div>
                                    : null}
                                {moreOptionsModal && <MoreOptionsPostModal showModal={setMoreOptionsModal} post={originalPost} />}
                                <div className='post-details'>
                                    <h1>{originalPost.author.firstName} {originalPost.author.lastName}</h1>
                                    <Link to={`/posts/${originalPostId}`} >
                                        <p>{originalPost.textContent}</p>
                                        {originalPost.imageUrl && <div className="image-container">
                                            <img src={originalPost.imageUrl}
                                                alt={`posté par ${originalPost.author.firstName} ${originalPost.author.lastName} `} />
                                        </div>}
                                    </Link>
                                    <br />
                                    <span>Posté <Moment fromNow>{originalPost.createdAt}</Moment> </span>
                                    <br />
                                    {originalPost.updatedAt !== originalPost.createdAt ? <span>Modifié <Moment fromNow>{originalPost.updatedAt}</Moment> </span> : null}

                                </div>
                                <div className="post-icons-container">
                                    <Like post={originalPost} userId={userId} />

                                    <FontAwesomeIcon icon={faMessage} aria-label='Commenter' className="post-icons" onClick={() => setCommentModal(true)} />
                                    {commentModal && <CreateCommentModal showModal={setCommentModal} postId={originalPost.id} />}

                                    <FontAwesomeIcon icon={faShare} aria-label='Partager' className="post-icons" onClick={() => setSharePostModal(true)} />
                                    {sharePostModal && <SharePostModal showModal={setSharePostModal} post={originalPost} />}
                                </div>
                            </div>
                        </article>


                        <div className="post-details">
                            <span>Posté <Moment fromNow>{post.createdAt}</Moment> </span>
                        </div>
                    </div>
                </article>
            }
        </>
    );
};

export default SharedPostTemplate;