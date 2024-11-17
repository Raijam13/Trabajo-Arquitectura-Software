const express = require('express');
const router = express.Router();
const Video = require('../models/video');


// Crear una nueva Video (POST /Videos)

router.post('/', async (req, res) => {
  try {
    const newVideo = new Video({
      vendedor: req.body.vendedor,
      video: req.body.video,
      video2: req.body.video2
    });
    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (err) {
    res.status(400).send('Error al subir Video: ' + err.message);
  }
});

// Obtener todas las Videos (GET /Videos)
router.get('/:vendedorId', async (req, res) => {
  try {
    const Videos = await Video.find({ vendedor: req.params.vendedorId });
    res.json(Videos);
  } catch (err) {
    res.status(400).send('Error al obtener Videos: ' + err.message);
  }
});

module.exports = router;
