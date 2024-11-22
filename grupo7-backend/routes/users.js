
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


// PATRON VALIDAR DNI CON RENIEC

router.post('/vdni', async (req, res) => {
  try {
  
    res.status(202).send('Recibido')

     // Inicializar el Status Endpoint 
     let responseDNI= await axios.post('https://localhost:3000/users/dnistatus', {any});

    // Validar el DNI llamando a la API de Sunat
    const apidni = `https://api.apis.net.pe/v2/reniec/dni?numero=${req.body.id}`;
    const consulta = await axios.get(apidni, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    // Await para simular tiempo de demora en la consulta a Reniec 
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    
  
    // Si el estado es 'Pendiente', esperar a que cambie
    //
    if (!consulta.data.success) {
      return res.status(400).json({ error: 'El RUC no es válido' });
    } else{
      while (!responseDNI.data.estado){
        console.log('Esperando a que el estado cambie...');
        
        responseDNI = await axios.post('https://localhost:3000/users/dnistatus', {response});
      }
      return res.status(200).json({ mensaje: 'El DNI es válido' });
    }
    
   
  
  } catch (err) {
    res.status(400).send('Error al validar DNI: ' + err.message);
  }

});


router.post('/prueba', async (req, res) => {
  try {

    res.status(202).send('Recibido')

    const apistatus = `http://localhost:3009/users/dnistatus`
    const consulStatus = await axios.get(apistatus, {
      headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        estado :false
    }),
    })

      // Await para simular tiempo de demora en la consulta a Reniec 
      await new Promise(resolve => setTimeout(resolve, 10000));


    // Validar el DNI llamando a la API de RENIEC
    const apidni = `https://api.apis.net.pe/v2/reniec/dni?numero=${req.body.id}`;
    const consulta = await axios.get(apidni, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    
    const nombres = consulta.data.nombres.toLowerCase();
    const nombreR = req.body.nombres.toLowerCase();

    if(nombres == nombreR){
      res.status(202).send(`Recibido, el nombre es: ${nombres}` )
      
    }else{
      res.status(400).send('EL DNI INGRESADO NO COINCIDE CON EL DE LA PERSONA A REGISTRAR')
    }
  

    
  
  } catch (err) {
    res.status(400).send('Error al validar DNI: ' + err.message);
  }

});


  let dni = 0;
  let estado = null ;
router.get('/dnistatus/:dni/:estado', async (req, res) => {


   dni = req.params.dni;      // Obtener el DNI desde la parte dinámica de la URL
   estado = true;  // Obtener el estado desde la parte dinámica de la URL
    
   if (!dni ) {
      return res.status(400).send('DNI no proporcionado');
   }
   

    if (estado == false) {
      res.status(200).send('Recurso no encontrado');
   } else {
      res.status(302).send('Recurso Encontrado');
   }

   dni = 0;

})







module.exports = router;
