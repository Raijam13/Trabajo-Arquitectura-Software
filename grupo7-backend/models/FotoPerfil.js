const mongoose = require('mongoose');

const fotoPerfilSchema = new mongoose.Schema({
  sujeto: { type: mongoose.Schema.Types.ObjectId, required: true }, // ID del usuario o vendedor
  tipoSujeto: { type: String, enum: ['User', 'Vendedor'], required: true }, // Define si es un usuario o un vendedor
  foto: { type: String, required: true }, // URL o ruta de la foto
});

// Crear el modelo de Foto de Perfil
const FotoPerfil = mongoose.model('FotoPerfil', fotoPerfilSchema);

module.exports = FotoPerfil;
