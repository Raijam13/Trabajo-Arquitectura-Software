const express = require('express');
const router = express.Router();
const Comentario = require('../models/comentario');

// Crear un nuevo comentario (POST /comentarios)
router.post('/', async (req, res) => {
  try {
    // Validación de la calificación para asegurarse de que sea un número entre 1 y 5
    if (calificación < 1 || calificación > 5) {
      return res.status(400).send('La calificación debe estar entre 1 y 5.');
    }
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

// Obtener comentarios de un servicio (GET /comentarios/:servicioId)
router.get('/:vendedorId', async (req, res) => {
  try {
    const comentarios = await Comentario.find({ vendedor: req.params.vendedorId });
    res.json(comentarios);
  } catch (err) {
    res.status(400).send('Error al obtener comentarios: ' + err.message);
  }
});


module.exports = router;
