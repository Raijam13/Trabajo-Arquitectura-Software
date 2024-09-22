const mongoose = require('mongoose');

// Comprador
const compraSchema = new mongoose.Schema({
    cantidad: { type: Number, required: true },
    fecha: {
        type: Date,
        default: Date.now
      },
    id_servicio: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true }
});

// Crear el modelo del usuario a partir del esquema
const Compra = mongoose.model('Compra', compraSchema);

module.exports = Compra;