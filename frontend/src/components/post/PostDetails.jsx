import React from 'react';
import { useParams } from 'react-router-dom';
import PostTemplate from './PostTemplate';
import Header from '../Header';
import useFetch from '../../hooks/useFetch';

/*this component defines the template of the page of a single post*/
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