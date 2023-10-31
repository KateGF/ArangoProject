import React, { useState, useEffect } from 'react';
import Comments from './Comments';
import { deletePost, fetchPostByFriend } from '../api';
import Friends from './Friends';
import { useLocation } from 'react-router-dom';
import MyPosts from './MyPosts';


function Posts({ }) {

    const location = useLocation();
    // Access the state from location
    const stateFromPosts = location.state;

    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);


    const fetchPostsByFriends = async () => {

        if (stateFromPosts) {
            try {
                const response = await fetchPostByFriend(stateFromPosts.userId);
                setPosts(response.data);
                console.log(response.data)
                setError(null);
            } catch (error) {
                setError("Error al cargar publicaciones. Por favor, inténtalo de nuevo.");
            }
        } else {
            setError("Ups, perdí las credenciales. Deberás iniciar sesión de nuevo.");
        }

    };



    const handleDeletePost = async (id) => {
        try {
            await deletePost(id);
            fetchPostsByFriends();
            setError(null);
        } catch (error) {
            setError("Error al eliminar la publicación. Por favor, inténtalo de nuevo.");
        }
    };

    useEffect(() => {

        fetchPostsByFriends();

    }, []);

    return (
        <div className="grid-container">
            <div className="creates-column">


                <MyPosts id={stateFromPosts.userId} username={stateFromPosts.username}></MyPosts>

            </div>
            <div className="posts-column">

                {error && <div className="error">{error}</div>}
                {posts && posts.length > 0 ? (
                    posts[0].map((post) => (
                        <div key={post._key} className="post-container py-5 border border-gray-200 rounded-md">
                            <h2 className='text-center'>
                                Author: {post.user}
                            </h2>
                            <p className="post-text">{post.text}</p>
                            <div className="post-content">
                                <Comments postID={post._key} username={stateFromPosts.username}></Comments>

                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-posts-message">No posts found for friends</div>
                )}

            </div>
            <div className="friends-column">
                <Friends userID={stateFromPosts.userId}></Friends>
            </div>
        </div>


    )
}

export default Posts;