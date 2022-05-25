import React from 'react';
import PostTemplate from './PostTemplate';

/*
  * this component allows to render each post on the home page
  * the posts props refers to every posts fetched in the "Home" page
*/
const PostList = ({ posts }) => {
    return (
        <div className='posts-container'>
            {posts.map((post) => (
                <PostTemplate post={post} key={post.id} />
            ))}
        </div>
    );
};

export default PostList;
