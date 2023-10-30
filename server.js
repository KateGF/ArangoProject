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
app.post('/api/data', async (req, res) => {
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
app.get('/api/data', async (req, res) => {
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
app.put('/api/data/:id', async (req, res) => {
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
app.delete('/api/data/:id', async (req, res) => {
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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
