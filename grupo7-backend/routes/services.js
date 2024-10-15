const express = require('express');
const router = express.Router();
const Service = require('../models/service');
const authenticateToken = require('../middlewares/authenticateToken');

// Crear un nuevo servicio (POST /services)
const { check, validationResult } = require('express-validator');

router.post('/', [
  check('titulo').not().isEmpty().withMessage('El título es obligatorio'),
  check('costo_promedio').isNumeric().withMessage('El costo promedio debe ser un número'),
], authenticateToken, async (req, res) => {
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
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    // Eliminar el servicio de la colección de servicios
    const deletedService = await Service.findByIdAndDelete(req.params.id);

    if (!deletedService) {
      return res.status(404).send('Servicio no encontrado');
    }

    // También eliminamos la referencia en el campo `id_compra` del usuario autenticado, si existe
    await User.updateOne(
      { _id: req.user.id }, 
      { $pull: { id_compra: req.params.id } } // Eliminamos la referencia de `id_compra`
    );

    res.send('Servicio eliminado correctamente');
  } catch (err) {
    res.status(400).send('Error al eliminar servicio: ' + err.message);
  }
});


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