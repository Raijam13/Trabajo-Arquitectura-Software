const mongoose = require('mongoose');

const fotoSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vendedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendedor', required: true },
  foto: { type: String, required: true },
});

// Crear el modelo de Foto 
const Foto = mongoose.model('Foto', fotoSchema);

module.exports = Foto;
