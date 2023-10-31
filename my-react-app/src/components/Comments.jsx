import React, { useState, useEffect } from 'react';
import { createComment, deleteComment, getComments } from '../api';
function Comments({ postID }) {
    const [comments, setComments] = useState({});
    const [error, setError] = useState(null);
    const [commentText, setCommentText] = useState('');

    const handleCreateComment = async (postId) => {
        try {

            await createComment(postId, { text: commentText });
            fetchComments(postID);
            setCommentText('');
            setError(null);
        } catch (error) {
            setError("Error al crear un comentario. Por favor, inténtalo de nuevo.");
        }
    };

    const handleDeleteComment = async (postId, commentId) => {
        try {
            await deleteComment(postId, commentId);
            fetchComments(postID);
            setError(null);
        } catch (error) {
            setError("Error al eliminar el comentario. Por favor, inténtalo de nuevo.");
        }
    };
    const handleSetText = (e) => {
        setCommentText(e.target.value);
    };

    const fetchComments = async (idPost) => {
        try {
            const response = await getComments(idPost);
            setComments(response.data);
            setError(null);
        } catch (error) {
            setError("Error al cargar publicaciones. Por favor, inténtalo de nuevo.");
        }
    };

    useEffect(() => {
        fetchComments(postID);
    }, []);

    return (

        <div className="comments">

            {Array.isArray(comments) && comments.map((comment) => (
                <div key={comment._key} className="comment-container">
                    <span>{comment.text}</span>
                    <button onClick={() => handleDeleteComment(postID, comment._key)}>-</button>
                </div>
            ))}
            <div className="comment-input">
                <input
                    className='appearance-none block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green focus:border-green sm:text-sm'
                    type="text"
                    placeholder="Add a comment"
                    onChange={handleSetText}
                />
                <button className="bg-green float-right text-black rounded-md py-1 px-2"
                    onClick={() => handleCreateComment(postID)}>Add Comment</button>
            </div>

        </div>
    )
}

export default Comments;