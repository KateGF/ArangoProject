import React, { useState, useEffect } from 'react';
import { createComment, deleteComment, getComments } from './api';
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
            console.log(response);
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
                    type="text"
                    placeholder="Add a comment"
                    onChange={handleSetText}
                />
                <button onClick={() => handleCreateComment(postID)}>Add Comment</button>
            </div>

        </div>
    )
}

export default Comments;