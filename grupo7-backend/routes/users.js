const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Clave secreta para firmar el token (guárdala en un archivo de variables de entorno para mayor seguridad)
const JWT_SECRET = process.env.JWT_SECRET;// || 'default_secret';

// Registrar un nuevo usuario (POST /users/signup)
router.post('/signup', async (req, res) => {
  try {
    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    // Crear un nuevo usuario
    const newUser = new User({
      usuario: req.body.usuario,
      gmail: req.body.gmail,
      password: hashedPassword
    });
    
    // Guardar en la base de datos
    await newUser.save();
    res.status(201).send('Usuario registrado exitosamente');
  } catch (err) {
    res.status(400).send('Error al registrar usuario: ' + err.message);
  }
});

// Iniciar sesión y generar JWT (POST /users/login)
router.post('/login', async (req, res) => {
  try {
    // Buscar al usuario por gmail
    const user = await User.findOne({ gmail: req.body.gmail });
    if (!user) return res.status(400).send('Usuario no encontrado');

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.status(400).send('Contraseña incorrecta');

    // Generar token JWT
    const token = jwt.sign({ id: user._id}, JWT_SECRET, { expiresIn: '1h' }); // El token expira en 1 hora

    res.json({ token });
  } catch (err) {
    res.status(400).send('Error al iniciar sesión: ' + err.message);
  }
});

// Ruta protegida de ejemplo (GET /users/protected)
router.get('/protected', authenticateToken, (req, res) => {
  res.send('Acceso a la ruta protegida concedido');
});

// Middleware para autenticar token JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).send('Acceso denegado: No se proporcionó token');

  // Verificar token
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send('Token inválido');
    req.user = user;
    next();
  });
}

module.exports = router;
