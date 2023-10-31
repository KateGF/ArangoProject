import React, { useState, useEffect } from 'react';
import Comments from './Comments';
import { getPosts, createPost, deletePost, fetchPostsByUsername } from '../api';
import Friends from './Friends';
import { useLocation } from 'react-router-dom';


function Posts({ }) {

    const location = useLocation();
    // Access the state from location
    const stateFromPosts = location.state;

    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');
    const [error, setError] = useState(null);


    const fetchPosts = async () => {
        try {
            const response = await getPosts();
            setPosts(response.data);
            setError(null);
        } catch (error) {
            setError("Error al cargar publicaciones. Por favor, inténtalo de nuevo.");
        }
    };

    const fetchPostsByUser = async () => {

        try {
            const response = await fetchPostsByUsername(stateFromPosts.username);
            setPosts(response.data);
            setError(null);
        } catch (error) {
            setError("Error al cargar publicaciones. Por favor, inténtalo de nuevo.");
        }
    };

    const handleCreatePost = async () => {

        try {
            await createPost({ text: newPost, user: stateFromPosts.username });
            fetchPostsByUser();
            setNewPost('');
            setError(null);
        } catch (error) {
            setError("Error al crear una publicación. Por favor, inténtalo de nuevo.");
        }
    };

    const handleDeletePost = async (id) => {
        try {
            await deletePost(id);
            fetchPostsByUser();
            setError(null);
        } catch (error) {
            setError("Error al eliminar la publicación. Por favor, inténtalo de nuevo.");
        }
    };

    useEffect(() => {
        fetchPostsByUser();
    }, []);

    return (

        <div className="App">
            <Friends></Friends>
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