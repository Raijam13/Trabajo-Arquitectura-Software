const express = require('express');
const router = express.Router();
const Comentario = require('../models/comentario');

// Crear un nuevo comentario (POST /comentarios)
router.post('/', async (req, res) => {
  try {
    const { usuario, vendedor, comentario, calificación } = req.body;

    // Validación de la calificación para asegurarse de que sea un número entre 1 y 5
    if (calificación < 1 || calificación > 5) {
      return res.status(400).send('La calificación debe estar entre 1 y 5.');
    }

    const newComentario = new Comentario({
      usuario,
      vendedor,
      comentario,
      calificación,
      fecha: req.body.fecha
    });

    await newComentario.save();
    res.status(201).json(newComentario);
  } catch (err) {
    res.status(400).send('Error al crear comentario: ' + err.message);
  }
});

// Obtener comentarios de un servicio (GET /comentarios/:servicioId)
router.get('/vendedor/:vendedorId', async (req, res) => {
  try {
    const comentarios = await Comentario.find({ vendedor: req.params.vendedorId })
      .populate('usuario', 'nombre_completo')
      .populate('vendedor', 'nombre_completo');
    res.status(200).json(comentarios);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener comentarios', detalles: err.message });
  }
});

module.exports = router;
