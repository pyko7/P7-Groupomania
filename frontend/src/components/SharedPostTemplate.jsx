import React, { useState } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faShare, faCircle } from '@fortawesome/free-solid-svg-icons';
import CreateCommentModal from './CreateCommentModal';
import MoreOptionsPostModal from './MoreOptionsPostModal';
import { Link } from 'react-router-dom';
import SharedPostOptionsModal from './SharedPostOptionsModal';
import useFetch from '../hooks/useFetch';
import SharePostModal from './SharePostModal';

const SharedPostTemplate = ({ post }) => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const userId = userData.userId;
    const originalPostId = post.originalPostId
    const user = post.author
    const { data: originalPost } = useFetch(`http://localhost:3000/api/posts/${originalPostId}`)
    const [commentModal, setCommentModal] = useState(null);
    const [moreOptionsModal, setMoreOptionsModal] = useState(null);
    const [sharedPostOptions, setSharedPostOptions] = useState(null);
    const [sharePostModal, setSharePostModal] = useState(null);



    return (
        <>
            {originalPost &&
                <article className='user-post'>
                    <div className="post-profile-picture">
                        <img src={user.profilePicture} alt='photo de profil' />
                    </div>
                    <div className='user-content'>
                        <span id="sharedBy"> Partagé par {user.firstName} {user.lastName}</span>
                        {userId === user.id ?
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
                                {userId === originalPost.author.id ?
                                    <div className="more-options" onClick={() => setMoreOptionsModal(true)} >
                                        <FontAwesomeIcon icon={faCircle} aria-label='Ouvrir options' className="more-dots" />
                                        <FontAwesomeIcon icon={faCircle} aria-label='Ouvrir options' className="more-dots" />
                                        <FontAwesomeIcon icon={faCircle} aria-label='Ouvrir options' className="more-dots" />
                                    </div>
                                    : null}
                                {moreOptionsModal && <MoreOptionsPostModal showModal={setMoreOptionsModal} post={post} />}
                                <Link to={`/posts/${originalPostId}`} >
                                    <div className='post-details'>
                                        <h1>{originalPost.author.firstName} {originalPost.author.lastName}</h1>
                                        <p>{originalPost.textContent}</p>
                                        {post.imageUrl && <div className="image-container">
                                            <img src={post.imageUrl}
                                                alt={`posté par ${originalPost.author.firstName} ${originalPost.author.lastName} `} />
                                        </div>}
                                        <br />
                                        <span>Posté <Moment fromNow>{originalPost.createdAt}</Moment> </span>
                                        <br />
                                        {originalPost.updatedAt !== originalPost.createdAt ? <span>Modifié <Moment fromNow>{originalPost.updatedAt}</Moment> </span> : null}

                                    </div>
                                </Link>
                                <div className="post-icons-container">
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