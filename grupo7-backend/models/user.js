const mongoose = require('mongoose');

// Definir el esquema del usuario
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Crear el modelo del usuario a partir del esquema
const User = mongoose.model('User', userSchema);

module.exports = User;
