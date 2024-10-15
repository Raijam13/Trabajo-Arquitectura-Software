const Service = require('../models/service'); // Importamos el modelo Service
const { validationResult } = require('express-validator');

// Crear un nuevo servicio (POST /api/services)
exports.crearServicio = async (req, res) => {
  // Validar los datos de la solicitud
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const nuevoServicio = new Service({
      tipo: req.body.tipo,
      titulo: req.body.titulo,
      servicio_description: req.body.servicio_description,
      costo_promedio: req.body.costo_promedio,
      costo_descripción: req.body.costo_descripción,
      id_foto: req.body.id_foto || [], // Fotos opcionales
      id_comentario: req.body.id_comentario || [] // Comentarios opcionales
    });

    // Guardar el nuevo servicio en la base de datos
    const servicioGuardado = await nuevoServicio.save();
    res.status(201).json(servicioGuardado);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el servicio', error: error.message });
  }
};

// Obtener todos los servicios (GET /api/services)
exports.obtenerServicios = async (req, res) => {
  try {
    const servicios = await Service.find(); 
    res.status(200).json(servicios); 
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener servicios', error: error.message });
  }
};

// Obtener un servicio por ID (GET /api/services/:id)
exports.obtenerServicioPorId = async (req, res) => {
  try {
    const servicio = await Service.findById(req.params.id);

    if (!servicio) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }

    res.status(200).json(servicio);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el servicio', error: error.message });
  }
};

// Eliminar un servicio (DELETE /api/services/:id)
exports.eliminarServicio = async (req, res) => {
  try {
    const servicioEliminado = await Service.findByIdAndDelete(req.params.id); 

    if (!servicioEliminado) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }

    res.status(200).json({ message: 'Servicio eliminado correctamente' }); 
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el servicio', error: error.message });
  }
};