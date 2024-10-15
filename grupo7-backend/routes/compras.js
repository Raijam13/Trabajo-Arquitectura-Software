const express = require('express');
const router = express.Router();
const Compra = require('../models/Compra');

// Crear una nueva compra (POST /compras)
router.post('/', async (req, res) => {
  try {
    const newCompra = new Compra(req.body);
    await newCompra.save();
    res.status(201).json(newCompra);
  } catch (err) {
    res.status(400).send('Error al registrar compra: ' + err.message);
  }
});

// Obtener todas las compras (GET /compras)
router.get('/', async (req, res) => {
  try {
    const compras = await Compra.find();
    res.json(compras);
  } catch (err) {
    res.status(400).send('Error al obtener compras: ' + err.message);
  }
});

module.exports = router;
