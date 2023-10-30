import React, { useState, useEffect } from 'react';
import { getComments, createComment, updateComment, deleteComment } from './api';

function App() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [updatingComment, setUpdatingComment] = useState({ id: null, text: '' });
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    try {
      const response = await getComments();
      setComments(response.data);
      setError(null);
    } catch (error) {
      setError("Error al cargar comentarios. Por favor, inténtalo de nuevo.");
    }
  };

  const handleCreateComment = async () => {
    try {
      await createComment({ text: newComment });
      fetchComments();
      setNewComment('');
      setError(null);
    } catch (error) {
      setError("Error al crear un comentario. Por favor, inténtalo de nuevo.");
    }
  };

  const handleUpdateComment = async () => {
    if (updatingComment.id) {
      try {
        // Realiza la llamada a la API para actualizar el comentario
        await updateComment(updatingComment.id, { text: updatingComment.text });
  
        // Limpia el estado de updatingComment y recarga los comentarios
        setUpdatingComment({ id: null, text: '' });
        fetchComments();
        setError(null);
      } catch (error) {
        setError("Error al actualizar el comentario. Por favor, inténtalo de nuevo.");
      }
    }
  };
  

  const handleDeleteComment = async (id) => {
    try {
      await deleteComment(id);
      fetchComments();
      setError(null);
    } catch (error) {
      setError("Error al eliminar el comentario. Por favor, inténtalo de nuevo.");
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="App">
      <h1>Create Comment</h1>
      <input
        type="text"
        placeholder="New Comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button onClick={handleCreateComment}>Create</button>

      {error && <div className="error">{error}</div>}

      {comments.map((comment) => (
        <div key={comment._key}>
          {updatingComment.id === comment._key ? (
            <>
              <input
                type="text"
                value={updatingComment.text}
                onChange={(e) => setUpdatingComment({ ...updatingComment, text: e.target.value })}
              />
              <button onClick={handleUpdateComment}>Update</button>
            </>
          ) : (
            <>
              <span>{comment.text}</span>
              <button onClick={() => setUpdatingComment({ id: comment._key, text: comment.text })}>Edit</button>
            </>
          )}
          <button onClick={() => handleDeleteComment(comment._key)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
