import React from 'react';
import { useParams } from 'react-router-dom';
import PostTemplate from './PostTemplate';
import moment from 'moment/min/moment-with-locales';
import Moment from 'react-moment';
import 'moment-timezone';
import Header from './Header';
import useFetch from '../hooks/useFetch';

// instances every 30 seconds.
Moment.startPooledTimer(30000);
// Sets the moment instance to use.
Moment.globalMoment = moment;
// Set the locale for every react-moment instance to French.
Moment.globalLocale = 'fr';


const PostDetails = () => {
    const { id } = useParams()
    const { data: post } = useFetch(`http://localhost:3000/api/posts/${id}`)
    return (
        <div>
            <Header />
            <main>
                <div className="main-container">
                    {post &&
                        <PostTemplate post={post} />
                    }
                </div>
            </main>
        </div>

    );
};

export default PostDetails;