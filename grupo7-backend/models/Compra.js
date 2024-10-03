const mongoose = require('mongoose');

// Definir el esquema de Compra
const compraSchema = new mongoose.Schema({
  ID_servicio: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  cantidad_servicio: { type: Number, required: true },
  fecha: { type: Date, default: Date.now },
  comprador: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // ID del comprador
});

// Crear el modelo de Compra a partir del esquema
const Compra = mongoose.model('Compra', compraSchema);

module.exports = Compra;
