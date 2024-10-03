const express = require('express');
const router = express.Router();
const Compra = require('../models/Compra');
const authenticateToken = require('../middlewares/authenticateToken');

// Crear una nueva compra (POST /compras)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const newCompra = new Compra(req.body);
    await newCompra.save();
    res.status(201).json(newCompra);
  } catch (err) {
    res.status(400).send('Error al registrar compra: ' + err.message);
  }
});

// Obtener todas las compras de un usuario (GET /compras)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const compras = await Compra.find({ comprador: req.user.id });
    res.json(compras);
  } catch (err) {
    res.status(400).send('Error al obtener compras: ' + err.message);
  }
});

module.exports = router;
