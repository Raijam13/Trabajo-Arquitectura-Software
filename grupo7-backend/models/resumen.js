const mongoose = require('mongoose');

const ResumenSchema = new mongoose.Schema({
  vendedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendedor', required: true },
  resumen: { type: String, required: true }
});

// Crear el modelo del Resumen 
const Resumen = mongoose.model('resumen', ResumenSchema);

module.exports = Resumen;