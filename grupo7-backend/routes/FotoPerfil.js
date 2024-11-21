const express = require('express');
const router = express.Router();
const FotoPerfil = require('../models/FotoPerfil');


// Crear una nueva foto (POST /fotos)

router.post('/', async (req, res) => {
    const { sujeto, tipoSujeto, foto } = req.body;
  
    // Validación de los datos de entrada
    if (!sujeto || !tipoSujeto || !foto) {
      return res.status(400).json({ error: 'Los campos sujeto, tipoSujeto y foto son obligatorios.' });
    }
  
    if (!['User', 'Vendedor'].includes(tipoSujeto)) {
      return res.status(400).json({ error: 'El campo tipoSujeto debe ser "User" o "Vendedor".' });
    }
  
    try {
      // Buscar si ya existe una foto de perfil para este sujeto y tipo
      let fotoPerfil = await FotoPerfil.findOne({ sujeto, tipoSujeto });
  
      if (fotoPerfil) {
        // Si ya existe, actualizamos la foto
        fotoPerfil.foto = foto;
        await fotoPerfil.save();
        return res.json({ message: 'Foto de perfil actualizada con éxito.', foto: fotoPerfil });
      } else {
        // Si no existe, creamos un nuevo registro
        fotoPerfil = new FotoPerfil({ sujeto, tipoSujeto, foto });
        await fotoPerfil.save();
        return res.status(201).json({ message: 'Foto de perfil creada con éxito.', foto: fotoPerfil });
      }
    } catch (error) {
      console.error('Error al guardar la foto de perfil:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  });

// Obtener todas las fotos (GET /fotos)
router.get('/:id', async (req, res) => {
    const { id } = req.params; // ID del sujeto
    const { tipoSujeto } = req.query; // Tipo de sujeto (User o Vendedor)
  
    if (!tipoSujeto || !['User', 'Vendedor'].includes(tipoSujeto)) {
      return res.status(400).json({ error: 'El parámetro tipoSujeto es requerido y debe ser "User" o "Vendedor".' });
    }
  
    try {
      // Buscar la foto de perfil por ID y tipoSujeto
      const fotoPerfil = await FotoPerfil.findOne({ sujeto: id, tipoSujeto });
  
      if (!fotoPerfil) {
        return res.status(404).json({ error: 'No se encontró la foto de perfil.' });
      }
  
      res.json({ foto: fotoPerfil.foto }); // Devolver solo la URL o ruta de la foto
    } catch (error) {
      console.error('Error al obtener la foto de perfil:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  });

module.exports = router;
