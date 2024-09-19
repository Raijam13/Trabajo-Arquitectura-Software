const express = require('express');
require('dotenv').config(); // Carga el archivo .env (donde no se sube a GitHub)
const mongoose = require('mongoose'); // Conexión a MongoDB
const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a MongoDB
const mongoURI = process.env.MONGODB_URI; // Toma la URI de MongoDB desde el archivo .env
mongoose.connect(mongoURI)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error al conectar MongoDB:', err));

// Middleware para manejar JSON
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  res.send('Marketplace de Servicios del Hogar');
});

// Importar rutas de usuarios
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

// Iniciar servidor en IPv4 (127.0.0.1)
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
