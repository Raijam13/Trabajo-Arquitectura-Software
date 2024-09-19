const mongoose = require('mongoose');

// Definir el esquema del servicio
const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Referencia al usuario vendedor
  createdAt: { type: Date, default: Date.now }
});

// Crear el modelo del servicio a partir del esquema
const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
