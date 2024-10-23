const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Vendedor = require('../models/user');
// Clave secreta para firmar el token (guárdala en un archivo de variables de entorno para mayor seguridad)
const JWT_SECRET = process.env.JWT_SECRET;

// Registrar a un vendedor (POST /users/signup)
router.post('/signup_vendedor', async (req, res) => {
  try {
    console.log(req.body); // Para ver los datos que llegan al servidor

    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // Validar el RUC llamando a la API de Sunat
    const accessToken = "apis-token-11100.fMZ7XW7D39jYNrzE92p9YH2OjsNCXhD4";
    const rucValidationUrl = `https://api.apis.net.pe/v2/sunat/ruc/full?numero=${ruc}`;
    
    const response = await axios.get(rucValidationUrl, {
        headers: {
            Authorization: `Bearer Token ${accessToken}` // Incluyendo el accessToken en el header
        }
    });
    // Imprimir la respuesta completa para ver qué se devuelve
    console.log('Respuesta de la API de Sunat:', response.data);
    /**/

    if (response.data.message && response.data.message === "ruc no valido") {
        return res.status(400).json({ error: 'El RUC no es válido' });
    } else{
    // Crear un nuevo usuario
    const newUser = new Vendedor({
      usuario: req.body.usuario,
      gmail: req.body.gmail,
      password: hashedPassword,
      edad: req.body.edad,
      nombre_completo: req.body.nombre_completo,
      ruc: req.body.nombre_completo,
      dni: req.body.dni,
      telefono: req.body.telefono,
      imagen_perfil: req.body.imagen_perfil
    });
    }
    // Guardar en la base de datos
    await newUser.save();
    res.status(201).send('Usuario registrado exitosamente');
  
  } catch (err) {
    res.status(400).send('Error al registrar usuario: ' + err.message);
  }

});

// Registrar un nuevo usuario (POST /users/signup)
router.post('/signup', async (req, res) => {
  try {
    console.log(req.body); // Para ver los datos que llegan al servidor

    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    // Crear un nuevo usuario
    const newUser = new User({
      usuario: req.body.usuario,
      gmail: req.body.gmail,
      password: hashedPassword,
      edad: req.body.edad,
      nombre_completo: req.body.nombre_completo,
      dni: req.body.dni,
      telefono: req.body.telefono,
      imagen_perfil: req.body.imagen_perfil,
      id_compra: [],  // Inicialmente vacío
      id_comentario: []  // Inicialmente vacío
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
    // Buscar al usuario por correo electrónico (gmail)
    const user = await User.findOne({ gmail: req.body.gmail });
    if (!user) return res.status(400).send('Usuario no encontrado');

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.status(400).send('Contraseña incorrecta');

    // Generar token JWT
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(400).send('Error al iniciar sesión: ' + err.message);
  }
});
// Obtener la información del usuario autenticado (GET /users/me)
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('id_compra')  // Popula la referencia de compras
      .populate('id_comentario');  // Popula la referencia de comentarios

    if (!user) return res.status(404).send('Usuario no encontrado');

    res.json(user);
  } catch (err) {
    res.status(400).send('Error al obtener la información del usuario: ' + err.message);
  }
});
// Actualizar información del usuario (PUT /users/me)
router.put('/me', authenticateToken, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).send('Error al actualizar la información del usuario: ' + err.message);
  }
});
// Eliminar la cuenta del usuario autenticado (DELETE /users/me)
router.delete('/me', authenticateToken, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.send('Cuenta eliminada correctamente');
  } catch (err) {
    res.status(400).send('Error al eliminar la cuenta: ' + err.message);
  }
});


// Middleware para autenticar token JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).send('Acceso denegado: No se proporcionó token');

  // Verificar token
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send('Token inválido');
    req.user = user;  // Añadir la información del usuario a la solicitud
    next();
  });
}


module.exports = router;
