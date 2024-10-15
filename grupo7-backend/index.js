const express = require('express');
require('dotenv').config(); // Carga el archivo .env (donde no se sube a GitHub)
const mongoose = require('mongoose'); // Conexión a MongoDB
const cors = require('cors'); // Habilitar CORS si es necesario
const app = express();
const PORT = process.env.PORT || 3009;

// Habilitar CORS
app.use(cors()); // Permitir solicitudes desde diferentes orígenes

// Conexión a MongoDB
const mongoURI = process.env.MONGODB_URI; // Toma la URI de MongoDB desde el archivo .env
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
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

// Rutas de servicios
const serviceRoutes = require('./routes/services');
app.use('/services', serviceRoutes);

// Rutas de comentarios
const comentarioRoutes = require('./routes/comentarios');
app.use('/comentarios', comentarioRoutes);

// Rutas de fotos
const fotoRoutes = require('./routes/fotos');
app.use('/fotos', fotoRoutes);

// Rutas de compras
const compraRoutes = require('./routes/compras');
app.use('/compras', compraRoutes);

// Iniciar servidor (usando 0.0.0.0 para permitir conexiones desde cualquier IP local)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
