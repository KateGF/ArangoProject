// my-react-app/src/App.js
import React, { useState, useEffect } from 'react';
import { getComments, createComment, updateComment, deleteComment } from './api';


function App() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [updatingComment, setUpdatingComment] = useState({ id: null, text: '' });

  const fetchComments = async () => {
    const response = await getComments();
    setComments(response.data);
  };

  const handleCreateComment = async () => {
    await createComment({ text: newComment });
    fetchComments();
    setNewComment('');
  };

  const handleUpdateComment = async () => {
    await updateComment(updatingComment.id, { text: updatingComment.text });
    fetchComments();
    setUpdatingComment({ id: null, text: '' });
  };

  const handleDeleteComment = async (id) => {
    await deleteComment(id);
    fetchComments();
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="App">
      <h1>CRUD App</h1>
      <input
        type="text"
        placeholder="New Comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button onClick={handleCreateComment}>Create</button>

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
