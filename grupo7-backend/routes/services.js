const express = require('express');
const router = express.Router();
const Service = require('../models/service');


// Crear un nuevo servicio
router.post('/', async (req, res) => {
  const { tipo, titulo, servicio_description, estado, usuario, vendedor, costo_promedio, costo_descripción } = req.body;

  // Validar campos obligatorios
  if (!usuario || !vendedor) {
      return res.status(400).json({ error: 'Los campos usuario y vendedor son obligatorios.' });
  }

  const estadosPermitidos = ['EN_CARRITO','EN_PROCESO', 'FINALIZADO', 'CALIFICADO'];
  if (estado && !estadosPermitidos.includes(estado)) {
      return res.status(400).json({ error: `Estado "${estado}" no permitido` });
  }

  try {
      const nuevoServicio = new Service({
          tipo,
          titulo,
          servicio_description,
          estado: estado || 'EN_CARRITO', // Estado por defecto
          usuario,
          vendedor,
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

// Obtener servicios por usuario  (NO ME SIRVE (ANDRE))
router.get('/usuario/:usuarioId', async (req, res) => {
    try {
        const servicios = await Service.find({ usuario: req.params.usuarioId })
            .populate('usuario', 'nombre_completo')
            .populate('vendedor', 'nombre_completo');
        res.status(200).json(servicios);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener servicios del usuario', detalles: err.message });
    }
});

// Obtener servicios por vendedor   (NO ME SIRVE (ANDRE))
router.get('/vendedor/:vendedorId', async (req, res) => {
    try {
        const servicios = await Service.find({ vendedor: req.params.vendedorId })
            .populate('usuario', 'nombre_completo')
            .populate('vendedor', 'nombre_completo');
        res.status(200).json(servicios);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener servicios del vendedor', detalles: err.message });
    }
});

// Actualizar un servicio completo (NO ME SIRVE (ANDRE))
router.put('/:serviceId', async (req, res) => {
    const { tipo, titulo, servicio_description, estado, usuario, vendedor, costo_promedio, costo_descripción } = req.body;

    try {
        const servicio = await Service.findById(req.params.serviceId);
        if (!servicio) {
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }

        servicio.tipo = tipo || servicio.tipo;
        servicio.titulo = titulo || servicio.titulo;
        servicio.servicio_description = servicio_description || servicio.servicio_description;
        servicio.estado = estado || servicio.estado;
        servicio.usuario = usuario || servicio.usuario;
        servicio.vendedor = vendedor || servicio.vendedor;
        servicio.costo_promedio = costo_promedio || servicio.costo_promedio;
        servicio.costo_descripción = costo_descripción || servicio.costo_descripción;

        await servicio.save();

        res.status(200).json({ mensaje: 'Servicio actualizado con éxito', servicio });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar servicio', detalles: err.message });
    }
});

// Cambiar estado de un servicio en el carrito a "EN_PROCESO"
router.put('/carrito/pagar/:serviceId', async (req, res) => {
    try {
        const serviceId = req.params.serviceId;
        const servicio = await Service.findByIdAndUpdate(
            serviceId,
            { $set: { estado: 'EN_PROCESO' } },
            { new: true }
        );

        if (servicio) {
            res.status(200).json({ mensaje: 'Gracias por tu compra', servicio });
        } else {
            res.status(404).json({ error: 'Servicio no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar servicio', detalles: err.message });
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

// Obtener todos los servicios en estado "EN_CARRITO"
router.get('/en-carrito', async (req, res) => {
    try {
        const servicios = await Service.find({ estado: 'EN_CARRITO' })
            .populate('usuario', 'nombre_completo')
            .populate('vendedor', 'nombre_completo');
        res.status(200).json(servicios);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener servicios en carrito', detalles: err.message });
    }
});

// Finalizar un trabajo
router.put('/trabajo/finalizar/:serviceId', async (req, res) => {
    try {
        const serviceId = req.params.serviceId;
        const servicio = await Service.findByIdAndUpdate(
            serviceId,
            { $set: { estado: 'FINALIZADO' } },
            { new: true }
        );
        if (servicio) {
            res.status(200).json({ mensaje: 'Servicio finalizado con éxito', servicio });
        } else {
            res.status(404).json({ error: 'Servicio no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al finalizar servicio', detalles: err.message });
    }
});



// Calificar un trabajo
router.put('/trabajo/calificar/:serviceId', async (req, res) => {
    try {
        const { calificacion } = req.body;
        const serviceId = req.params.serviceId;
        const servicio = await Service.findByIdAndUpdate(
            serviceId,
            { $set: { estado: 'CALIFICADO', calificacion } },
            { new: true }
        );
        if (servicio) {
            res.status(200).json({ mensaje: 'Gracias por tu tiempo', servicio });
        } else {
            res.status(404).json({ error: 'Servicio no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al calificar el servicio', detalles: err.message });
    }
});

// Obtener servicios por estado
router.get('/estado/:estado', async (req, res) => {
    try {
        const estado = req.params.estado;
        const servicios = await Service.find({ estado })
            .populate('usuario', 'nombre_completo')
            .populate('vendedor', 'nombre_completo');
        res.status(200).json(servicios);
    } catch (err) {
        res.status(500).json({ error: `Error al obtener servicios en estado ${estado}`, detalles: err.message });
    }
});

module.exports = router;