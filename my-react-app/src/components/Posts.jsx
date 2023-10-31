import React, { useState, useEffect } from 'react';
import Comments from './Comments';
import { getPosts, createPost, deletePost, getFriends } from '../api';

function Posts({ }) {
    const [posts, setPosts] = useState([]);
    const [friends, setFriends] = useState([]);
    const [newPost, setNewPost] = useState('');

    const [error, setError] = useState(null);

    const fetchFriends = async () => {
        try {
            const response = await getFriends(12623);
            setFriends(response.data);
            setError(null);
        } catch (error) {
            setError("Error al cargar amigos. Por favor, inténtalo de nuevo.")
        }
    };

    const fetchPosts = async () => {
        try {
            const response = await getPosts();
            setPosts(response.data);
            setError(null);
        } catch (error) {
            setError("Error al cargar publicaciones. Por favor, inténtalo de nuevo.");
        }
    };

    const handleCreatePost = async () => {
        try {
            await createPost({ text: newPost });
            fetchPosts();
            setNewPost('');
            setError(null);
        } catch (error) {
            setError("Error al crear una publicación. Por favor, inténtalo de nuevo.");
        }
    };

    const handleDeletePost = async (id) => {
        try {
            await deletePost(id);
            fetchPosts();
            setError(null);
        } catch (error) {
            setError("Error al eliminar la publicación. Por favor, inténtalo de nuevo.");
        }
    };

    useEffect(() => {
        fetchPosts();
        fetchFriends();
    }, []);

    return (

        <div className="App">
            <h1>Friends</h1>
            {friends.map((friend) => (
                <div key={friend._key}>
                    <span>{friend}</span>
                </div>
            ))}
            <hr></hr>
            <h1>Create Post</h1>
            <br></br>
            <input
                type="text"
                placeholder="New Post"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
            />
            <button onClick={handleCreatePost}>Create</button>
            <hr></hr>
            {error && <div className="error">{error}</div>}

            {posts.map((post) => (
                <div key={post._key} className="post-container">
                    <div className="post-content">
                        <span>{post.text}  <button onClick={() => handleDeletePost(post._key)}> Delete Post  </button></span>
                        <Comments postID={post._key}></Comments>

                    </div>
                </div>
            ))}

        </div>
    )
}

export default Posts;