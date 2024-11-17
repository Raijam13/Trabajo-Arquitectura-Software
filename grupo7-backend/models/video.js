const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  vendedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendedor', required: true },
  video: { type: String, required: true },
  descripción: { type: String, required: false }
});

// Crear el modelo de Video 
const Video = mongoose.model('Video', VideoSchema);

module.exports = Video;
