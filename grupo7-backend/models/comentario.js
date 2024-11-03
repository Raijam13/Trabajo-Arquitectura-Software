const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vendedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendedor', required: true },
  comentario: { type: String, required: true },
  calificación: { type: Number, required: true, min: 1, max: 5 },
  fecha: { type: Date, default: Date.now }
});

// Crear el modelo del comentario 
const Comentario = mongoose.model('Comentario', comentarioSchema);

module.exports = Comentario;
