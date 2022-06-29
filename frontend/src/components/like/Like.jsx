import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

/* this component defines the template & the function of liking a post  
 * the post props refers to the liked/unliked post
 * the userId props refers to the user who like/unlike the post
*/
const Like = ({ post, userId }) => {
    const id = post.id;
    //total of post likes
    const [likesCount, setLikesCount] = useState()
    //icon style if user has already liked or not
    const [userLiked, setUserLiked] = useState()


    //check if the user has already liked the post
    const checkLikes = (postLikes, userId) => {
        let isLiked = false;
        postLikes.forEach((like) => {
            if (like.authorId === userId) {
                isLiked = true;
            }
        });
        return isLiked;
    };

    //get the total of likes on the post
    useEffect(() => {
        const getLikeStatus = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/posts/${id}/like`)
                const data = await res.json();
                if (!res.ok) return;
                const isLiked = checkLikes(data.like, userId);
                setUserLiked(isLiked);
                setLikesCount(data.like.length);
                return data
            } catch (error) {
                return console.log(error);
            }
        };
        getLikeStatus();
    }, [userLiked]);


    //send the data to the DB
    const handleLike = async () => {
        const likeValue = userLiked ? false : true;
        const settings = {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                userLiked: likeValue
            }),
        }
        try {
            const res = await fetch(`http://localhost:3000/api/posts/${id}/like`, settings);
            const data = await res.json();
            if (!res.ok) return;
            setUserLiked(!userLiked)
            likeValue ? setLikesCount(likesCount + 1)
                : setLikesCount(likesCount - 1);
            /*used to keep same datas displayed for the like on 
            original post & shared post.
            if we remove the reload, the datas displayed between original post 
            & shared post won't be the same due to different state in different components.
            this line we'll be removed in a next version of the app*/
            window.location.reload();
            return data
        } catch (error) {
            return console.log(error);
        }
    }



    return (
        <div className='like-icon-container'>
            {userLiked ?
                <FontAwesomeIcon icon={faThumbsUp} className='post-icons active-icon' onClick={() => handleLike()} />
                :
                <FontAwesomeIcon icon={faThumbsUp} className='post-icons' onClick={() => handleLike()} />
            }
            {likesCount > 0 && <p>{likesCount}</p>}
        </div>
    )
};
export default Like;