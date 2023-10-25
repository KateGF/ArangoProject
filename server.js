const express = require('express');
const { Database, aql } = require('arangojs');
const app = express();
const port = 3000;

const db = new Database({ url: 'http://localhost:8529', databaseName: '_system' });
db.useBasicAuth('root', '1234');

app.use(express.json());

app.get('/api/data', async (req, res) => {
  try {
    const cursor = await db.query(aql`FOR doc IN users RETURN doc`);
    const data = await cursor.all();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
