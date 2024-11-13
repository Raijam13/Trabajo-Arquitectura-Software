const express = require('express');
const router = express.Router();
const Resumen = require('../models/resumen');

// Crear un nuevo Resumen (POST /Resumen)
router.post('/', async (req, res) => {
  try {
    const newResumen = new Resumen({
      vendedor: req.body.vendedor,
      resumen: req.body.resumen
    });
    await newResumen.save();
    res.status(201).json(newResumen);
  } catch (err) {
    res.status(400).send('Error al crear Resumen: ' + err.message);
  }
});

// Obtener Resumenes de un vendedor (GET /Resumenes/:vendedorId)
router.get('/:vendedorId', async (req, res) => {
  try {
    const Resumenes = await Resumen.find({ vendedor: req.params.vendedorId });
    res.json(Resumenes);
  } catch (err) {
    res.status(400).send('Error al obtener Resumenes: ' + err.message);
  }
});

module.exports = router;