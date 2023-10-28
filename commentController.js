// commentController.js
const express = require('express');
const router = express.Router();
const { CommentModel } = require('./models'); // Importa el modelo de comentarios

router.post('/', async (req, res) => {
  try {
    const commentData = req.body; // Supongamos que el cuerpo de la solicitud contiene los datos del comentario
    const result = await CommentModel.save(commentData);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear un comentario' });
  }
});

module.exports = router;
