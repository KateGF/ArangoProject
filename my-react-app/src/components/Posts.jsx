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
        <div className="grid-container">
            <div className="friends-column">

                <hr></hr>
                <h1>Create Post</h1>
                <input
                    className='appearance-none block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green focus:border-green sm:text-sm'
                    type="text"
                    placeholder="New Post"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                />
                <button className="group relative  h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-green float-right" onClick={handleCreatePost}>Create</button>
                <hr></hr>
                <Friends userID={stateFromPosts.userId}></Friends>
            </div>
            <div className="posts-column">

                {error && <div className="error">{error}</div>}
                {posts.map((post) => (
                    <div key={post._key} className="post-container py-10">
                        <h2 className='text-center'> | {post._key} | {post.text} |  <span>
                            <button className="bg-red-500 float-right text-white rounded-md py-1 px-2"
                                onClick={() => handleDeletePost(post._key)}> Delete </button>

                        </span></h2>
                        <div className="post-content">
                            <Comments postID={post._key}></Comments>
                            <hr></hr>
                        </div>
                    </div>
                ))}
            </div>
        </div>


    )
}

export default Posts;