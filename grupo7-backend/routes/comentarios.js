const express = require('express');
const router = express.Router();
const Comentario = require('../models/comentario');
const authenticateToken = require('../middlewares/authenticateToken');

// Crear un nuevo comentario (POST /comentarios)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const newComentario = new Comentario(req.body);
    await newComentario.save();
    res.status(201).json(newComentario);
  } catch (err) {
    res.status(400).send('Error al crear comentario: ' + err.message);
  }
});

// Obtener comentarios de un servicio (GET /comentarios/:servicioId)
router.get('/:servicioId', async (req, res) => {
  try {
    const comentarios = await Comentario.find({ servicio: req.params.servicioId });
    res.json(comentarios);
  } catch (err) {
    res.status(400).send('Error al obtener comentarios: ' + err.message);
  }
});

module.exports = router;
