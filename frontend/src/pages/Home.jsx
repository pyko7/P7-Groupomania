import React from 'react';
import Spinner from '../components/Spinner';
import CreatePost from '../components/CreatePost';
import Header from '../components/Header';
import PostList from '../components/PostList';
import useFetch from '../hooks/useFetch';

const Home = () => {
    /*get datas named as posts and pending status from API- it shows every posts*/
    const { data: posts, isPending } = useFetch("http://localhost:3000/api/posts")


    return (
        <div>
            < Header />
            <main>
                <div className="main-container">
                    < CreatePost />
                    {isPending && <Spinner />}
                    {posts && < PostList posts={posts} />}
                </div>
            </main>
        </div>
    );
};

export default Home;

