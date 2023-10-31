import React, { useState, useEffect } from 'react';
import Comments from './Comments';
import { createPost, deletePost, fetchPostsByUsername } from '../api';

function MyPosts({ id, username }) {


    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    const [newPost, setNewPost] = useState('');

    const fetchPostByUser = async () => {

        if (id) {
            try {
                const response = await fetchPostsByUsername(username);
                setPosts(response.data);
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
            fetchPostByUser();
            setError(null);
        } catch (error) {
            setError("Error al eliminar la publicación. Por favor, inténtalo de nuevo.");
        }
    };

    const handleCreatePost = async () => {

        try {
            await createPost({ text: newPost, user: username });
            fetchPostByUser();
            setNewPost('');
            setError(null);
        } catch (error) {
            setError("Error al crear una publicación. Por favor, inténtalo de nuevo.");
        }
    };

    useEffect(() => {

        fetchPostByUser();

    }, []);

    return (
        <div>
            <h1>Create Post</h1>
            <input
                className='appearance-none block w-full  px-3 py-2  border border-gray-200 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green focus:border-green sm:text-sm'
                type="text"
                placeholder="New Post"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
            />
            <button className="group relative  h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-green float-right" onClick={handleCreatePost}>Create</button>
            <h1>My Posts</h1>
            {error && <div className="error">{error}</div>}
            {posts && posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post._key} className="post-container py-5 border border-gray-200 rounded-md">
                        <h2 className='text-center'>
                            Author: {post.user}
                        </h2>
                        <p className="post-text">{post.text}</p>
                        <div className="post-content">
                            <Comments postID={post._key} username={username}></Comments>
                            <button
                                className="bg-red-500 text-white rounded-md py-1 px-2 mt-2"
                                onClick={() => handleDeletePost(post._key)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <div className="no-posts-message">No posts found for me</div>
            )}



        </div>


    )
}

export default MyPosts;