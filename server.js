const express = require('express');
const { Database } = require('arangojs');
const app = express();
const port = 3000;

// Habilita CORS permitiendo todas las solicitudes de origen (esto puede ser ajustado según tus necesidades)
const cors = require('cors');
app.use(cors());

const db = new Database({ url: 'http://localhost:8529', databaseName: '_system' });
db.useBasicAuth('root', '1234');

app.use(express.json());

// Create
app.post('/api/comments', async (req, res) => {
  // Validate the request body
  const comment = req.body;
  console.log('Creating comment:', comment);

  // Save the comment to the database
  try {
    await db.collection('comments').save(comment);
    console.log('Comment created successfully');
    res.json(comment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Read
app.get('/api/comments', async (req, res) => {
  try {
    const cursor = await db.query('FOR doc IN comments RETURN doc');
    const data = await cursor.all();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update
app.put('/api/comments/:id', async (req, res) => {
  // Validate the request body
  const comment = req.body;
  console.log(`Updating comment with ID: ${req.params.id}, Text: ${comment.text}`);

  // Update the comment in the database
  try {
    const result = await db.query({
      query: `
        UPDATE { _key: @key } WITH { text: @text } IN comments RETURN NEW
      `,
      bindVars: { key: req.params.id, text: comment.text }
    });

    console.log('Comment updated successfully');
    res.json(result._result);
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete
app.delete('/api/comments/:id', async (req, res) => {
  console.log(`Deleting comment with ID: ${req.params.id}`);
  // Delete the comment from the database
  try {
    await db.collection('comments').remove(req.params.id);
    console.log('Comment deleted successfully');
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
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
    console.error(error);
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
    res.json(user);
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

