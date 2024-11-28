import React, { useState } from 'react';
import { Modal, Button, Box, Rating, TextField } from '@mui/material';

const CalificacionModal = ({ open, onClose, onSubmit, trabajoId }) => {
    const [calificacion, setCalificacion] = useState(0);
    const [comentario, setComentario] = useState('');

    const handleCalificar = () => {
        onSubmit(trabajoId, calificacion, comentario);
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ ...modalStyles, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2>Califica al Vendedor</h2>
                <Rating
                    name="simple-controlled"
                    value={calificacion}
                    onChange={(_, newValue) => setCalificacion(newValue)}
                    size="large"
                />
                <TextField
                    label="Comentario"
                    multiline
                    rows={4}
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    sx={{ marginTop: 2, width: '100%' }}
                />
                <Button variant="contained" color="primary" onClick={handleCalificar} sx={{ marginTop: 2 }}>
                    Enviar Calificación
                </Button>
            </Box>
        </Modal>
    );
};

const modalStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    boxShadow: 24,
    borderRadius: 4,
};

export default CalificacionModal;