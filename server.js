const express = require('express');
const { Database } = require('arangojs');
const app = express();
const port = 3000;
const { aql } = require('arangojs');
// Habilita CORS permitiendo todas las solicitudes de origen (esto puede ser ajustado según tus necesidades)
const cors = require('cors');
app.use(cors());

const db = new Database({ url: 'http://localhost:8529', databaseName: '_system' });
db.useBasicAuth('root', '1234');

app.use(express.json());


app.post('/api/posts/:id/comments', async (req, res) => {

  const postId = req.params.id;
  const comment = req.body;

  try {
    comment.postId = postId;

    await db.collection('comments').save(comment);
    res.json(comment);
  } catch (error) {

    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/api/posts/:id/comments', async (req, res) => {
  const postId = req.params.id;

  try {
    const cursor = await db.query(
      'FOR doc IN comments FILTER doc.postId == @postId RETURN doc',
      { postId }
    );
    const data = await cursor.all();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/posts/by-user/:user', async (req, res) => {
  const user = req.params.user;
  try {
    const cursor = await db.query(
      'FOR doc IN posts FILTER doc.user == @user RETURN doc',
      { user }
    );
    const data = await cursor.all();

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/posts/by-friends/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const getFriendsQ = await db.query(
      `
      FOR doc IN is_friend
        FILTER doc._from == @userId
        FOR user IN users
          FILTER user._id == doc._to
          RETURN { id: doc._key, user: user.user, status: doc.status }
      `,
      { userId: `users/${userId}` }
    );

    const friends = await getFriendsQ.all();

    console.log("All my friends" + friends);

    if (friends.length === 0) {
      return res.json({ message: 'No friends found' });
    }

    const allPostsByFriends = [];

    for (const friend of friends) {
      console.log("For" + friend.user);
      const postsQ = await db.query(
        'FOR doc IN posts FILTER doc.user == @user RETURN doc',
        { user: friend.user }
      );

      const posts = await postsQ.all();
      console.log("Posts: " + posts);
      if (posts.length > 0) {
        allPostsByFriends.push(posts);
      }
    }

    if (allPostsByFriends.length === 0) {
      return res.json({ message: 'No posts found for friends' });
    }

    res.json(allPostsByFriends);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.put('/api/comments/:id', async (req, res) => {

  const comment = req.body;

  try {
    const result = await db.query({
      query: `
        UPDATE { _key: @key } WITH { text: @text } IN comments RETURN NEW
      `,
      bindVars: { key: req.params.id, text: comment.text }
    });

    res.json(result._result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete
app.delete('/api/comments/:id', async (req, res) => {
  // Delete the comment from the database
  try {
    await db.collection('comments').remove(req.params.id);
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Create Post
app.post('/api/posts', async (req, res) => {
  const post = req.body;


  try {
    await db.collection('posts').save(post);
    res.json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Read Posts
app.get('/api/posts', async (req, res) => {
  try {
    const cursor = await db.query('FOR doc IN posts RETURN doc');
    const data = await cursor.all();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update Post
app.put('/api/posts/:id', async (req, res) => {
  const post = req.body;

  try {
    const result = await db.query({
      query: `
        UPDATE { _key: @key } WITH { text: @text } IN posts RETURN NEW
      `,
      bindVars: { key: req.params.id, text: post.text }
    });

    res.json(result._result);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete Post
app.delete('/api/posts/:id', async (req, res) => {


  try {
    await db.collection('posts').remove(req.params.id);

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {

    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/friends/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const cursor = await db.query(
      `
      FOR doc IN is_friend
        FILTER doc._from == @userId
        FOR user IN users
          FILTER user._id == doc._to
          RETURN { id: doc._key, user: user.user, status: doc.status }
      `,
      { userId: `users/${userId}` }
    );

    const data = await cursor.all();

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/posts/by-friends/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const getFriendsQ = await db.query(
      `
      FOR doc IN is_friend
        FILTER doc._from == @userId
        FOR user IN users
          FILTER user._id == doc._to
          RETURN { id: doc._key, user: user.user, status: doc.status }
      `,
      { userId: `users/${userId}` }
    );
    const friends = await getFriendsQ.all();
    console.log("All my friends" + friends);
    if (friends.length === 0) {
      return res.json({ message: 'No friends found' });
    }
    const allPostsByFriends = [];
    for (const friend of friends) {
      console.log("For" + friend.user);
      const postsQ = await db.query(
        'FOR doc IN posts FILTER doc.user == @user RETURN doc',
        { user: friend.user }
      );
      const posts = await postsQ.all();
      console.log("Posts: " + posts);
      if (posts.length > 0) {
        allPostsByFriends.push(posts);
      }
    }
    if (allPostsByFriends.length === 0) {
      return res.json({ message: 'No posts found for friends' });
    }
    res.json(allPostsByFriends);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Define the friends collection
const friendsCollection = db.collection('is_friend');
const usersCollection = db.collection('users');

// agregar amigo 
app.post('/api/friends/:user1/:user2', async (req, res) => {
  const user1 = req.params.user1;
  const user2Username = req.params.user2;

  try {
    
    // Buscar el usuario correspondiente a user1 y user2
    const user1Document = await usersCollection.document(user1);
    const user2Document = await usersCollection.firstExample({ user: user2Username });

    if (!user1Document || !user2Document) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    // Obtener el _id de los usuarios
    const user1Id = user1Document._id;
    const user2Id = user2Document._id;

    const result = await db.query({
      query: `
        INSERT { _from: @user1, _to: @user2 , status: "accepted"} INTO is_friend
        RETURN NEW
      `,
      bindVars: { user1: user1Id, user2: user2Id }
    });
    
    let newFriendship;
    if (result._documents && result._documents.length > 0) {
      newFriendship = result._documents[0];
    }
    
    res.json({ success: true, message: 'Relación de amistad agregada correctamente', data: newFriendship });
  } catch (error) {
    console.error('Error al agregar relación de amistad:', error);
    res.status(500).json({ success: false, message: 'Hubo un error al agregar la relación de amistad' });
  }
});

app.put('/api/friends/:friendId', async (req, res) => {
  const friendId = req.params.friendId;
  const friendData = req.body;
  try {
    const result = await friendsCollection.update(friendId, friendData);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



app.delete('/api/friends/:friendId', async (req, res) => {
  const friendId = req.params.friendId;
  try {
    const result = await friendsCollection.remove(friendId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// mi busqueda
app.get('/api/friends2/:userID', async (req, res) => {
 
  const userID = req.params.userID;

  try {
    console.log(userID);
    const cursor = await db.query(aql`
    FOR friend IN is_friend
    FILTER friend._from == ${`users/${userID}`}
    LET user = DOCUMENT(friend._to)
    RETURN user
    `);
   
    const data = await cursor.all();
   
    console.log(JSON.stringify(data));
    res.json(data);
   
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



























// Endpoint to search friends
app.get('/api/friends/search/:friendId', async (req, res) => {
  const friendId = req.params.friendId;

  try {
    const cursor = await db.query(aql`
      FOR doc IN is_friend
        FILTER doc._from == ${`users/${friendId}`}
        RETURN doc
    `);

    const data = await cursor.all();

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to accept friendship
app.put('/api/friends/accept/:friendId', async (req, res) => {
  const friendId = req.params.friendId;

  try {
    const doc = await db.collection('is_friend').document(friendId);
    // Update the status or perform any necessary operations to accept the friendship
    // Example: doc.status = 'accepted';
    await db.collection('is_friend').update(friendId, doc);

    res.json({ message: 'Friendship accepted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to search friends
app.get('/api/friends/:userId/search', async (req, res) => {
  const userId = req.params.userId;
  const searchTerm = req.query.searchTerm;

  try {
    const cursor = await db.query({
      query: `
        FOR doc IN is_friend
          FILTER doc._from == @userId && CONTAINS(doc.user, @searchTerm)
          RETURN doc
      `,
      bindVars: { userId: `users/${userId}`, searchTerm }
    });

    const data = await cursor.all();

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Controladores para operaciones CRUD de usuarios
// Crear un usuario
app.post('/api/users', async (req, res) => {
  try {
    const userData = req.body;
    const result = await usersCollection.save(userData);
    res.json(result);
  } catch (error) {

    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener todos los usuarios
app.get('/api/users', async (req, res) => {
  try {
    const cursor = await db.query(aql`
      FOR user IN ${usersCollection}
      RETURN user
    `);
    const users = await cursor.all();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener un usuario por ID
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await usersCollection.document(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {

    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/api/users/by-user/:username', async (req, res) => {
  try {
    const username = req.params.username;

    const cursor = await db.query(
      'FOR user IN users FILTER user.user == @username RETURN user',
      { username }
    );
    const user = await cursor.all();
    if (user.length === 0) {
      res.status(404).json({ error: 'Usuario no encontrado' });
    } else {
      res.json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});



// Actualizar un usuario por ID
app.put('/api/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;
    await usersCollection.update(userId, updatedData);
    res.json({ message: 'Usuario actualizado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});



// Eliminar un usuario por ID
app.delete('/api/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    await usersCollection.remove(userId);
    res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

