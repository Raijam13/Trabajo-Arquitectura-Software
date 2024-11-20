const express = require('express');
const router = express.Router();
const Service = require('../models/service');

// Crear un nuevo servicio
router.post('/', async (req, res) => {
  const { tipo, titulo, servicio_description, estado, cliente, trabajador, costo_promedio, costo_descripción } = req.body;

  // Validar campos obligatorios
  if (!cliente || !trabajador) {
      return res.status(400).json({ error: 'Los campos cliente y trabajador son obligatorios.' });
  }

  const estadosPermitidos = ['EN_PROCESO', 'FINALIZADO', 'CALIFICADO'];
  if (estado && !estadosPermitidos.includes(estado)) {
      return res.status(400).json({ error: `Estado "${estado}" no permitido` });
  }

  try {
      const nuevoServicio = new Service({
          tipo,
          titulo,
          servicio_description,
          estado: estado || 'EN_PROCESO', // Estado por defecto
          cliente,
          trabajador,
          costo_promedio,
          costo_descripción,
      });

      await nuevoServicio.save();
      res.status(201).json({ mensaje: 'Servicio creado con éxito', servicio: nuevoServicio });
  } catch (err) {
      res.status(500).json({ error: 'Error al crear servicio', detalles: err.message });
  }
});

// Obtener todos los servicios
router.get('/', async (req, res) => {
    try {
        const servicios = await Service.find();
        res.status(200).json(servicios);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener servicios', detalles: err.message });
    }
});

// Obtener servicios por cliente
router.get('/cliente/:clienteId', async (req, res) => {
    try {
        const servicios = await Service.find({ cliente: req.params.clienteId })
            .populate('cliente', 'nombre_completo')
            .populate('trabajador', 'nombre_completo');
        res.status(200).json(servicios);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener servicios del cliente', detalles: err.message });
    }
});

// Obtener servicios por trabajador
router.get('/trabajador/:trabajadorId', async (req, res) => {
    try {
        const servicios = await Service.find({ trabajador: req.params.trabajadorId })
            .populate('cliente', 'nombre_completo')
            .populate('trabajador', 'nombre_completo');
        res.status(200).json(servicios);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener servicios del trabajador', detalles: err.message });
    }
});

// Actualizar un servicio completo
router.put('/:serviceId', async (req, res) => {
    const { tipo, titulo, servicio_description, estado, cliente, trabajador, costo_promedio, costo_descripción } = req.body;

    try {
        const servicio = await Service.findById(req.params.serviceId);
        if (!servicio) {
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }

        servicio.tipo = tipo || servicio.tipo;
        servicio.titulo = titulo || servicio.titulo;
        servicio.servicio_description = servicio_description || servicio.servicio_description;
        servicio.estado = estado || servicio.estado;
        servicio.cliente = cliente || servicio.cliente;
        servicio.trabajador = trabajador || servicio.trabajador;
        servicio.costo_promedio = costo_promedio || servicio.costo_promedio;
        servicio.costo_descripción = costo_descripción || servicio.costo_descripción;

        await servicio.save();

        res.status(200).json({ mensaje: 'Servicio actualizado con éxito', servicio });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar servicio', detalles: err.message });
    }
});

// Cambiar estado de un servicio
router.put('/:serviceId/estado', async (req, res) => {
    const { nuevoEstado } = req.body;

    const estadosPermitidos = ['EN_PROCESO', 'FINALIZADO', 'CALIFICADO'];
    if (!estadosPermitidos.includes(nuevoEstado)) {
        return res.status(400).json({ error: `Estado "${nuevoEstado}" no permitido` });
    }

    try {
        const servicio = await Service.findById(req.params.serviceId);
        if (!servicio) {
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }

        servicio.estado = nuevoEstado;
        await servicio.save();

        res.status(200).json({ mensaje: 'Estado actualizado con éxito', servicio });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar estado del servicio', detalles: err.message });
    }
});

// Eliminar un servicio
router.delete('/:serviceId', async (req, res) => {
    try {
        const servicio = await Service.findByIdAndDelete(req.params.serviceId);

        if (!servicio) {
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }

        res.status(200).json({ mensaje: 'Servicio eliminado con éxito' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar servicio', detalles: err.message });
    }
});

module.exports = router;