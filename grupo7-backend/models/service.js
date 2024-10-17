const mongoose = require('mongoose');

// Definir el esquema del servicio
const serviceSchema = new mongoose.Schema({
  tipo: {
    type: String,
    enum: ['Electricista', 'Cocinero', 'Aseo', 'Gasfitero', 'Jardinero', 'Cerrajero'],
    required: true
  },
  titulo: { type: String, required: true },
  servicio_description: { type: String, required: true },
  costo_promedio: { type: Number, required: true },
  costo_descripción: { type: String, required: true },
  id_foto: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Foto', required: false }], // Relación con varias fotos
  id_comentario: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comentario', required: false }]
});

// Crear el modelo del servicio a partir del esquema
const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;

