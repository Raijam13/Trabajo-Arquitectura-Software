const mongoose = require('mongoose');

// Definir el esquema del servicio
const serviceSchema = new mongoose.Schema({  
  tipo: {
    type: String,
    enum: ['Electricista', 'Cocinero', 'Aseo', 'Gastifero', 'Jardinero', 'Cerrajero'],
    required: true
  },
  titulo: { type: String, required: true },
  servicio_description: { type: String, required: true },
  costo_promedio: { type: Number, required: true },
  costo_descripción: { type: String, required: true },
  // ID_vendedor
  id_foto: { type: mongoose.Schema.Types.ObjectId, ref: 'Foto', required: true },
  id_comentario: { type: mongoose.Schema.Types.ObjectId, ref: 'Comentario', required: true }
});

// Crear el modelo del servicio a partir del esquema
const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
