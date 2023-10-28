// postController.js
const express = require('express');
const router = express.Router();
const { PostModel } = require('./models'); // Importa el modelo de publicaciones

router.post('/', async (req, res) => {
  try {
    const postData = req.body; // Supongamos que el cuerpo de la solicitud contiene los datos de la publicación
    const result = await PostModel.save(postData);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear una publicación' });
  }
});

module.exports = router;
