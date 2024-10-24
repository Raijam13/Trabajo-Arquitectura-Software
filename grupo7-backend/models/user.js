const mongoose = require('mongoose');

// Definir el esquema del usuario
const userSchema = new mongoose.Schema({
  usuario: { type: String, required: true },
  gmail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nombre_completo: { type: String, required: false },
  dni: { type: Number, required: false },
  edad: { type: Number, required: false },
  telefono: { type: Number, required: false },
  imagen_perfil: { type: String, required: false },
  id_compra: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Compra', required: false }],
  id_comentario: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comentario', required: false }],
});

// Crear el modelo del usuario a partir del esquema
const User = mongoose.model('User', userSchema);

// Vendedor
const vendedorSchema = new mongoose.Schema({
  usuario: { type: String, required: true },
  gmail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nombre_completo: { type: String, required: true },
  ruc: { type: Number, required: true },
  dni: { type: Number, required: true },
  edad: { type: Number, required: true },
  telefono: { type: Number, required: true },
  imagen_perfil: { type: String, required: false },
  activdadEconomica: {type: String, required: true},
  id_servicio: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: false }],
});

// Crear el modelo del usuario a partir del esquema
const Vendedor = mongoose.model('Vendedor', vendedorSchema);

//module.exports = User, Vendedor;
module.exports = {
  User,
  Vendedor
};

