// models.js
const arangojs = require('arangojs');
const db = new arangojs.Database({ url: 'http://localhost:8529', databaseName: '_system' });

// Definición del modelo para Publicaciones
const PostModel = db.collection('posts');

// Definición del modelo para Comentarios
const CommentModel = db.collection('comments');

module.exports = {
  PostModel,
  CommentModel
};
