const express = require('express');
const router = express.Router();
const Service = require('../models/service');

// Crear un nuevo servicio (POST /services)
const { check, validationResult } = require('express-validator');

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
    // Eliminar el servicio de la colección de servicios
    const deletedService = await Service.findByIdAndDelete(req.params.id);

    if (!deletedService) {
      return res.status(404).send('Servicio no encontrado');
    }

    // Eliminar la referencia en el campo `id_compra` del usuario (si es necesario).
    // Si ya no hay autenticación, omitimos la actualización del usuario en este caso.

    res.send('Servicio eliminado correctamente');
  } catch (err) {
    res.status(400).send('Error al eliminar servicio: ' + err.message);
  }
});

module.exports = router;
