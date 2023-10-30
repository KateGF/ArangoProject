import React, { useState, useEffect } from 'react';
import { getPosts, createPost, deletePost } from './api';
import Comments from './Comments';

function App() {
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

  const handleLogin = () => {
    
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="App">
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

        </div>
        
      ))}

    </div>
  );
}

export default App;
