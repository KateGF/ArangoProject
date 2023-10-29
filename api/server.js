const express = require('express');
const { Database, aql } = require('arangojs');
const app = express();
const port = 3000;

const db = new Database({ url: 'http://localhost:8529', databaseName: '_system' });
db.useBasicAuth('root', '1234');

app.use(express.json());

// Create
app.post('/api/data', async (req, res) => {
 // Validate the request body
 const comment = req.body;

 // Save the comment to the database
 await db.query(aql`INSERT ${comment} INTO comments`);

 // Respond with the created comment
 res.json(comment);
});

// Read
app.get('/api/data', async (req, res) => {
 try {
  const cursor = await db.query(aql`FOR doc IN comments RETURN doc`);
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

 // Update the comment in the database
 await db.query(aql`UPDATE comments WITH ${comment} WHERE _key = ${req.params.id}`);

 // Respond with the updated comment
 res.json(comment);
});

// Delete
app.delete('/api/data/:id', async (req, res) => {
 // Delete the comment from the database
 await db.query(aql`REMOVE comments WHERE _key = ${req.params.id}`);

 // Respond with a success message
 res.json({ message: 'Comment deleted successfully' });
});

app.listen(port, () => {
 console.log(`Server is running on http://localhost:${port}`);
});