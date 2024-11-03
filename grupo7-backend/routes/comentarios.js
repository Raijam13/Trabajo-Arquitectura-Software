const express = require('express');
const router = express.Router();
const Comentario = require('../models/comentario');

// Crear un nuevo comentario (POST /comentarios)
router.post('/', async (req, res) => {
  try {
    const newComentario = new Comentario({
      usuario: req.body.usuario,
      vendedor: req.body.vendedor,
      comentario: req.body.comentario,
      calificación: req.body.calificación,
      fecha: req.body.fecha
    });
    await newComentario.save();
    res.status(201).json(newComentario);
  } catch (err) {
    res.status(400).send('Error al crear comentario: ' + err.message);
  }
});

// Obtener comentarios de un vendedor (GET /comentarios/:vendedorId)
router.get('/:vendedorId', async (req, res) => {
  try {
    const comentarios = await Comentario.find({ vendedor: req.params.vendedorId });
    res.json(comentarios);
  } catch (err) {
    res.status(400).send('Error al obtener comentarios: ' + err.message);
  }
});

module.exports = router;
