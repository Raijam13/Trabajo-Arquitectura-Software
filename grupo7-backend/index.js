const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3009;

// Middleware
app.use(cors()); // Permitir solicitudes desde diferentes orígenes
app.use(express.json()); // Habilitar el manejo de JSON

// Conectar a MongoDB
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error al conectar MongoDB:', err));

// Ruta principal
app.get('/', (req, res) => {
  res.send('Marketplace de Servicios del Hogar');
});

// Importar y usar rutas
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

const serviceRoutes = require('./routes/services');
app.use('/services', serviceRoutes);

const comentarioRoutes = require('./routes/comentarios');
app.use('/comentarios', comentarioRoutes);

const fotoRoutes = require('./routes/fotos');
app.use('/fotos', fotoRoutes);

const compraRoutes = require('./routes/compras');
app.use('/compras', compraRoutes);

const resumenRoutes = require('./routes/resumen');
app.use('/resumen', resumenRoutes);

// Importar y usar rutas de trabajos
const trabajosRoutes = require('./routes/trabajos');
app.use('/trabajos', trabajosRoutes);

// Importar y usar rutas de trabajos
const trabajosRoutes = require('./routes/trabajos');
app.use('/trabajos', trabajosRoutes);

//===============================
function runPythonScript() {
  const pythonProcess = spawn('C:/Users/USER/AppData/Local/Microsoft/WindowsApps/python.exe', ['routes/script_resumen.py']); // Cambia 'script.py' por la ruta correcta

  pythonProcess.stdout.on('data', (data) => {
      console.log(`Output: ${data}`); // Mostrar la salida del script en la consola
  });

  pythonProcess.stderr.on('data', (data) => {
      console.error(`Error: ${data}`); // Mostrar cualquier error que ocurra
  });

  pythonProcess.on('close', (code) => {
      console.log(`Proceso de Python finalizado con el código: ${code}`); // Mostrar el código de cierre del proceso
  });
}
// Ejecutar script
//runPythonScript();
//===============================

// Iniciar el servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
