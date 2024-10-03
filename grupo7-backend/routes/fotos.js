const express = require('express');
const router = express.Router();
const Foto = require('../models/Foto');


// Crear una nueva foto (POST /fotos)
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('foto'), async (req, res) => {
  try {
    const newFoto = new Foto({
      foto: req.file.path,  // Almacena el path donde se guardó la imagen
      descripción: req.body.descripción
    });
    await newFoto.save();
    res.status(201).json(newFoto);
  } catch (err) {
    res.status(400).send('Error al subir foto: ' + err.message);
  }
});

// Obtener todas las fotos (GET /fotos)
router.get('/', async (req, res) => {
  try {
    const fotos = await Foto.find();
    res.json(fotos);
  } catch (err) {
    res.status(400).send('Error al obtener fotos: ' + err.message);
  }
});

module.exports = router;
