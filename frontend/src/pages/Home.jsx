import React from 'react';
import Spinner from '../components/Spinner';
import CreatePost from '../components/CreatePost';
import Header from '../components/Header';
import PostList from '../components/PostList';
import useFetch from '../hooks/useFetch';

const Home = () => {
    const userAuth = JSON.parse(localStorage.getItem("user"));
    const id = userAuth.userId;
    /*get datas and pending status from API- it shows every posts*/
    const { data: posts, isPending } = useFetch("http://localhost:3000/api/posts")
    const { data: user } = useFetch(`http://localhost:3000/api/users/${id}`)


    return (
        <div>
            < Header />
            <main>
                <div className="main-container">
                    < CreatePost user={user} />
                    {isPending && <Spinner />}
                    {posts && < PostList posts={posts} user={user} />}
                </div>
            </main>
        </div>
    );
};

export default Home;

