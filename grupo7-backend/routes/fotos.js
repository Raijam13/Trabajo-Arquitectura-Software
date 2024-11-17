const express = require('express');
const router = express.Router();
const Foto = require('../models/Foto');


// Crear una nueva foto (POST /fotos)

router.post('/', async (req, res) => {
  try {
    const newFoto = new Foto({
      usuario: req.body.usuario,
      vendedor: req.body.vendedor,
      foto: req.body.foto,
      foto2: req.body.foto2
    });
    await newFoto.save();
    res.status(201).json(newFoto);
  } catch (err) {
    res.status(400).send('Error al subir foto: ' + err.message);
  }
});

// Obtener todas las fotos (GET /fotos)
router.get('/:vendedorId', async (req, res) => {
  try {
    const fotos = await Foto.find({ vendedor: req.params.vendedorId });
    res.json(fotos);
  } catch (err) {
    res.status(400).send('Error al obtener fotos: ' + err.message);
  }
});

module.exports = router;
