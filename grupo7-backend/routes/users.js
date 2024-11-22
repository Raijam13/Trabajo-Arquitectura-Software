
const express = require('express');
const router = express.Router();
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Vendedor } = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET;
const accessToken = "apis-token-11100.fMZ7XW7D39jYNrzE92p9YH2OjsNCXhD4";




// Middleware para manejar JSON (no es necesario en un archivo de rutas)
// Ya se maneja en `app.js`

// Registrar un vendedor (POST /users/signup_vendedor)
router.post('/signup_vendedor', async (req, res) => {
  try {
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Validar RUC llamando a la API de SUNAT
    const apiruc = `https://api.apis.net.pe/v2/sunat/ruc/full?numero=${req.body.ruc}`;
    const response = await axios.get(apiruc, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (response.data.success && response.data.success === "true") {
      return res.status(400).json({ error: 'El RUC no es válido' });
    }

    const newUser = new Vendedor({
      usuario: req.body.usuario,
      gmail: req.body.gmail,
      password: hashedPassword,
      nombre_completo: req.body.nombre_completo,
      ruc: req.body.ruc,
      dni: req.body.dni,
      edad: req.body.edad,
      telefono: req.body.telefono,
      imagen_perfil: req.body.imagen_perfil,
      actividadEconomica: response.data.actividadEconomica || 'Sin especificar',
      id_servicio: []
    });

    await newUser.save();
    res.status(201).send('Usuario registrado exitosamente');
  } catch (err) {
    res.status(400).send('Error al registrar usuario: ' + err.message);
  }
});

// Registrar un nuevo usuario (POST /users/signup)
router.post('/signup', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      usuario: req.body.usuario,
      gmail: req.body.gmail,
      password: hashedPassword,
      edad: req.body.edad,
      nombre_completo: req.body.nombre_completo,
      dni: req.body.dni,
      telefono: req.body.telefono,
      imagen_perfil: req.body.imagen_perfil,
      id_compra: [],
      id_comentario: []
    });

    await newUser.save();
    res.status(201).send('Usuario registrado exitosamente');
  } catch (err) {
    res.status(400).send('Error al registrar usuario: ' + err.message);
  }
});

// Iniciar sesión y generar JWT (POST /users/login)
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ gmail: req.body.gmail });
    if (!user) return res.status(400).send('Usuario no encontrado');

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.status(400).send('Contraseña incorrecta');

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(400).send('Error al iniciar sesión: ' + err.message);
  }
});

// Middleware para autenticar token JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).send('Acceso denegado: No se proporcionó token');

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send('Token inválido');
    req.user = user;
    next();
  });
}

// Obtener la información del usuario autenticado (GET /users/me)
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('id_compra').populate('id_comentario');
    if (!user) return res.status(404).send('Usuario no encontrado');
    res.json(user);
  } catch (err) {
    res.status(400).send('Error al obtener la información del usuario: ' + err.message);
  }
});




// Patrón ASYNC REQUEST REPLY validar DNI RENIEC

// variables para el patrón
  let dni = 0;
  let estado = null ;
  let mensajeE = 0;

// Código
router.post('/prueba', async (req, res) => {
  try {

    res.status(202).send('Recibido')

    dni= Number(req.body.id)
    estado = false

    // Await para simular tiempo de demora en la consulta a Reniec 
    await new Promise(resolve => setTimeout(resolve, 10000));


    // Validar el DNI llamando a la API de RENIEC
    const apidni = `https://api.apis.net.pe/v2/reniec/dni?numero=${req.body.id}`;
    const consulta = await axios.get(apidni, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    if( req.body.nombres.toLowerCase() == consulta.data.nombres.toLowerCase() && req.body.id == +consulta.data.numeroDocumento){
        estado = true
    }else{
      mensajeE = 1
    }

  
  } catch (err) {
    res.status(400).send('Error al validar DNI: ' + err.message);
    //console.log(err)
  }

});


// Status Endpoint
router.get('/dnistatus/:dniv/', async (req, res) => {
   try{
     // Obtener el DNI desde la parte dinámica de la URL

     let v1 = Number(req.params.dniv);

    
  if(mensajeE== 0){
    if( v1 == dni && estado == false){
      res.status(200).send('El recurso todavia no está listo');
      
  
    }else if( v1 == dni && estado == true ){
      res.status(302).send('Recurso encontrado, URL: https://LINK_DEL_RECURSO');
    }
  }
  else{
    res.status(200).send(`El DNI ingresado no coincide con el de la persona`)
  }

  await new Promise(resolve => setTimeout(resolve, 20000));
  
   dni = 0;
   estado =null;

   } catch (err) {
    
  }

});


// Obtener el nombre e imagen del usuario o vendedor según ID (GET /users/info/:id)
router.get('/info/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Buscar primero en la colección de usuarios
    const user = await User.findById(userId, 'usuario imagen_perfil');
    if (user) {
      return res.json({
        tipo: 'usuario',
        usuario: user.usuario,
        imagen_perfil: user.imagen_perfil
      });
    }

    // Si no está en usuarios, buscar en la colección de vendedores
    const vendedor = await Vendedor.findById(userId, 'usuario imagen_perfil');
    if (vendedor) {
      return res.json({
        tipo: 'vendedor',
        usuario: vendedor.usuario,
        imagen_perfil: vendedor.imagen_perfil
      });
    }

    // Si no se encuentra en ninguna colección
    res.status(404).send('ID no encontrado en usuarios ni vendedores');
  } catch (err) {
    res.status(400).send('Error al buscar la información: ' + err.message);
  }
});


// Obtener completoinfo del vendedor
router.get('/completoinfo/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Buscar en la colección de usuarios
    const user = await User.findById(userId, 'ruc actividadEconomica');
    if (user) {
      return res.json({
        tipo: 'usuario',
        ruc: user.ruc || 'No aplica',
        actividadEconomica: user.actividadEconomica || 'No aplica',
        edad: vendedor.edad || 'No aplica',
        telefono: vendedor.telefono || 'No aplica'
      });
    }

    // Buscar en la colección de vendedores
    const vendedor = await Vendedor.findById(userId, 'ruc actividadEconomica');
    if (vendedor) {
      return res.json({
        tipo: 'vendedor',
        ruc: vendedor.ruc,
        actividadEconomica: vendedor.actividadEconomica,
        edad: vendedor.edad,
        telefono: vendedor.telefono
      });
    }

    // Si no se encuentra en ninguna colección
    res.status(404).send('ID no encontrado en usuarios ni vendedores');
  } catch (err) {
    res.status(400).send('Error al buscar la información: ' + err.message);
  }
});






module.exports = router;
