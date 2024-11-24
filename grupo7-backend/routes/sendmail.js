const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Ruta para enviar correos
router.post('/', async (req, res) => {
    const { to, subject, text, html } = req.body;

    // Validar campos obligatorios
    if (!to || !subject || (!text && !html)) {
        return res.status(400).json({ error: 'Faltan parámetros requeridos: to, subject y text/html' });
    }

    try {
        // Configurar el transporte de correo
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', // Cambia esto si usas otro proveedor
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER, // Configura tus credenciales en variables de entorno
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // Opciones del correo
        const mailOptions = {
            from: process.env.EMAIL_USER, // Dirección del remitente
            to,                          // Dirección(es) del destinatario
            subject,                     // Asunto del correo
            text,                        // Contenido en texto plano
            html,                        // Contenido en formato HTML
        };

        // Enviar el correo
        const info = await transporter.sendMail(mailOptions);

        // Responder con éxito
        res.status(200).json({ message: 'Correo enviado con éxito', info });
    } catch (err) {
        res.status(500).json({ error: 'Error al enviar el correo', detalles: err.message });
    }
});

module.exports = router;