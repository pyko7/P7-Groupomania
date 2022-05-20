import React from 'react';
import moment from 'moment/min/moment-with-locales';
import Moment from 'react-moment';
import 'moment-timezone';
import PostTemplate from './PostTemplate';
import SharedPostTemplate from './SharedPostTemplate';


// instances every 30 seconds.
Moment.startPooledTimer(30000);
// Sets the moment instance to use.
Moment.globalMoment = moment;
// Set the locale for every react-moment instance to French.
Moment.globalLocale = 'fr';


const PostList = ({ posts }) => {

    return (
        <div className='posts-container'>
            {posts.map((post) => (
                <>
                    <PostTemplate post={post} key={post.id} />
                    {post.sharedPost.map((sharedPost => (
                        <SharedPostTemplate post={post} sharedPost={sharedPost} key={sharedPost.id} />
                    )))}
                </>
            ))}
        </div>
    );
};

export default PostList;
