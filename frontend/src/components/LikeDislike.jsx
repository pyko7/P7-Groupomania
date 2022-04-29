import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons'

const LikeDislike = () => {

    let likeValue = 0;
    let dislikeValue = 0;

    const [like, setLike] = useState(0);
    const [dislike, setDislike] = useState(0);
    const [activeLike, setActiveLike] = useState(false);
    const [activeDislike, setActiveDislike] = useState(false);

    /*
    * like state set to true
    * dislike state set to false
    * like value increases +1
    */
    const userLike = () => {
        setActiveLike(true);
        setActiveDislike(false);
        likeValue++;
        setLike(likeValue);
        console.log(likeValue);
    }

    /*
    * dislike state set to true
    * like state set to false
    * dislike value increases +1
    */
    const userDislike = () => {
        setActiveDislike(true);
        setActiveLike(false);
        dislikeValue++;
        setDislike(dislikeValue);
    }

    const handleLike = () => {
        if (activeLike) {
            likeValue--;
            setActiveDislike(false);
            setActiveLike(false);
        } else {
            userLike();
        }
    }

    const handleDislike = () => {
        if (activeDislike) {
            dislikeValue--;
            setActiveDislike(false);
            setActiveLike(false);
        } else {
            userDislike();
        }
    }

    return (
        <div className="like-dislike-icons-container">
            <FontAwesomeIcon
                icon={faThumbsUp}
                className={`${activeLike ? "active-icon" : "like-dislike-icons"} `}
                onClick={handleLike}
            />
            <FontAwesomeIcon
                icon={faThumbsDown}
                className={`${activeDislike ? "active-icon" : "like-dislike-icons"} `}
                onClick={handleDislike} />
        </div>
    );
};

export default LikeDislike;