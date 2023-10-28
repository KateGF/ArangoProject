// app.js (tu archivo principal)
const express = require('express');
const app = express();
const port = 3000;

// Importa el enrutador de comentarios
const commentRouter = require('./commentController');
// Importa el enrutador de publicaciones
const postRouter = require('./postController');

app.use(express.json());

// Usa el enrutador de comentarios en una ruta específica
app.use('/api/comments', commentRouter);
// Usa el enrutador de publicaciones en una ruta específica
app.use('/api/posts', postRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
