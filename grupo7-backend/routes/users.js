const express = require('express');
const router = express.Router();
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
app.use(express.json());
//const User = require('../models/user');
//const Vendedor = require('../models/user');
const { User, Vendedor } = require('../models/user');

const axios = require('axios'); // npm install axios

const JWT_SECRET = process.env.JWT_SECRET;

// Registrar a un vendedor (POST /users/signup)
router.post('/signup_vendedor', async (req, res) => {
  try {
    console.log(req.body); // Para ver los datos que llegan al servidor

    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // Validar el RUC llamando a la API de Sunat
    const accessToken = "apis-token-11100.fMZ7XW7D39jYNrzE92p9YH2OjsNCXhD4";
    const apiruc = `https://api.apis.net.pe/v2/sunat/ruc/full?numero=${req.body.ruc}`;
    const response = await axios.get(apiruc, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    // Imprimir la respuesta completa para ver qué se devuelve
    console.log('Respuesta de la API de Sunat:', response.data);
    if (response.data.success && response.data.success === "true") {
        return res.status(400).json({ error: 'El RUC no es válido' });
    } else{
    // Crear un nuevo usuario
    const newUser = new Vendedor({
      usuario: req.body.usuario,
      gmail: req.body.gmail,
      password: hashedPassword,
      nombre_completo: req.body.nombre_completo,
      ruc: req.body.ruc,
      dni: req.body.dni,
      edad: req.body.edad,
      telefono: req.body.telefono,
      imagen_perfil: req.body.imagen_perfil,//No es obligatorio llenarlo
      activdadEconomica: response.data.actividadEconomica,
      id_servicio: []//No es obligatorio llenarlo
    });
    // Guardar en la base de datos
    await newUser.save();
    }
    
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




// // Consultar DNI
// router.post('/vdni', async (req, res) => {

//   const { dni } = req.body;
//   try {
//     console.log(req.body); // Para ver los datos que llegan al servidor

//     res.status(202).send('Recibido')

//     estado = 0;

//     // Validar el DNI llamando a la API de RENIEC
//     const accessToken = "apis-token-11100.fMZ7XW7D39jYNrzE92p9YH2OjsNCXhD4";
//     const apidni = `https://api.apis.net.pe/v2/reniec/dni?numero=${req.body.dni}`;
//     const response = await axios.get(apidni, {
//         headers: {
//             Authorization: `Bearer ${accessToken}`
//         }
//     });
//     // Imprimir la respuesta completa para ver qué se devuelve
//     console.log('Respuesta de la API de RENIEC:', response.data);
//     if (response.data.message && response.data.numeroDocumento === "dni no valido") {
//         return res.status(400).json({ error: 'El DNI no es válido' });
//     } else{
 
      
//     }
  
//   } catch (err) {
//     res.status(400).send('Error al validar DNI: ' + err.message);
//   }

// });

// router.post('/dnistatus', async (req, res) => {

//      const es1  = false;
//      const es2  = true;
//     res.status(200).send('Solicitud Pendiente')

// })

// module.exports = router;




//////////////////////////////////////


const accessToken = "apis-token-11100.fMZ7XW7D39jYNrzE92p9YH2OjsNCXhD4";
const apidniUrl = 'https://api.apis.net.pe/v2/reniec/dni';
var estadoS ;
var docu;
// API de validación de DNI (API 2)
app.post('/api/vdni', async (req, res) => {
  const { dni } = req.body;

  try {
    // Responder inicialmente con 202 y la URL de consulta de estado
    res.status(202).json({ 
      message: 'Solicitud recibida y en proceso'
    });

    // Notificar a la API de estado que el DNI está "procesando"
    await axios.post(`http://localhost:3000/api/estado/${dni}`, {
      estado: false
    });

    // Llamar a la API de terceros para validar el DNI
    const response = await axios.get(`${apidniUrl}?numero=${dni}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    // Extraer solo el campo numeroDocumento de la respuesta
    const { numeroDocumento } = response.data;

    // Verificar que el número de documento coincida con el DNI proporcionado
    if (numeroDocumento === dni) {
      // Notificar a la API de estado que el DNI está "listo"
      await axios.post(`http://localhost:3000/api/estado/${dni}`, {
        estado: true,
        dni: dni 
        
      });
    } else {
      throw new Error('El DNI no coincide con el número de documento devuelto');
    }

  } catch (err) {
    console.error('Error al procesar la solicitud:', err.message);
    // Notificar a la API de estado que hubo un error
    await axios.post(`http://localhost:3000/api/estado/${dni}`, {
      estado: 'error',
      mensaje: err.message
    });
  }
});

// API de estado (API 4)
// Endpoint para consultar el estado de un DNI
app.get('/api/estado/:dni', (req, res) => {
  const { dni } = req.params;

  if (estadoS == true && docu == dni ) {
    // Si el estado es 1, devolverlo
    res.json({ dni, estado: estados[dni] });
    estadoS =false
  } else {
    // Si el DNI no se encuentra, devolver un error 404
    res.status(404).json({ error: 'Estado no encontrado para el DNI especificado' });
    
  }
});

// Endpoint para actualizar el estado de un DNI
app.post('/api/estado/:dni', (req, res) => {
  const { estado } = req.body;
  const { dni } = req.body;


   // Actualizar el estado del DNI e
  if (estado == true){
    
    estadoS = true; 
    docu = dni,
    res.json({ message: 'dni valido'});
  }
 
 
});
