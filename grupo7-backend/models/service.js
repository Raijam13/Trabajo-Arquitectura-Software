const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    tipo: {
        type: String,
        enum: ['Electricista', 'Cocinero', 'Aseo', 'Gasfitero', 'Jardinero', 'Cerrajero'],
        required: true,
    },
    titulo: { type: String, required: true },
    servicio_description: { type: String, required: true },
    estado: {
        type: String,
        enum: ['EN_CARRITO','EN_PROCESO', 'FINALIZADO', 'CALIFICADO'],
        default: 'EN_CARRITO',
    },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vendedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendedor', required: true },
    costo_promedio: { type: Number, required: true },
    costo_descripción: { type: String, required: true },
    id_foto: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Foto', required: false }],
    id_comentario: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comentario', required: false }],
    fechaCreacion: { type: Date, default: Date.now },
    ultimaActualizacion: { type: Date, default: Date.now },
});

// Middleware para actualizar la fecha de última modificación
serviceSchema.pre('save', function (next) {
    this.ultimaActualizacion = Date.now();
    next();
});

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;

