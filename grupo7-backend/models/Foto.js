const mongoose = require('mongoose');

const fotoSchema = new mongoose.Schema({
  foto: { type: String, required: true },  // Almacena la URL o el path de la foto
  descripción: { type: String, required: false }
});

// Crear el modelo de Foto 
const Foto = mongoose.model('Foto', fotoSchema);

module.exports = Foto;
