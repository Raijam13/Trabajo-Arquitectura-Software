const express = require('express');
const router = express.Router();
const Service = require('../models/service');
const { check, validationResult } = require('express-validator');

// Crear un nuevo servicio (POST /services)
router.post('/', [
  check('titulo').not().isEmpty().withMessage('El título es obligatorio'),
  check('costo_promedio').isNumeric().withMessage('El costo promedio debe ser un número'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newService = new Service(req.body);
    await newService.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(400).send('Error al crear servicio: ' + err.message);
  }
});

// Listar todos los servicios (GET /services)
router.get('/', async (req, res) => {
  try {
    const services = await Service.find(req.query);
    res.json(services);
  } catch (err) {
    res.status(400).send('Error al listar servicios: ' + err.message);
  }
});

// Eliminar un servicio (DELETE /services/:id)
router.delete('/:id', async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);

    if (!deletedService) {
      return res.status(404).send('Servicio no encontrado');
    }

    // Aquí eliminamos la referencia en `id_compra`, pero si no hay autenticación,
    // no tenemos información del usuario, así que podemos omitir esta parte.
    // await User.updateOne(
    //   { _id: req.user.id }, 
    //   { $pull: { id_compra: req.params.id } }
    // );

    res.send('Servicio eliminado correctamente');
  } catch (err) {
    res.status(400).send('Error al eliminar servicio: ' + err.message);
  }
});

// Rutas adicionales para listar servicios
router.get('/', async (req, res) => {
  console.log('Solicitud GET recibida');
  try {
    const services = await Service.find(req.query);
    res.json(services);
  } catch (err) {
    console.error('Error al listar servicios:', err.message);
    res.status(400).send('Error al listar servicios: ' + err.message);
  }
});

module.exports = router;
