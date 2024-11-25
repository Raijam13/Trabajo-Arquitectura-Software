import React, { useState } from 'react';
import { Modal, Button, Box, Rating } from '@mui/material';

const CalificacionModal = ({ open, onClose, onSubmit, trabajoId }) => {
    const [calificacion, setCalificacion] = useState(0);

    const handleCalificar = () => {
        onSubmit(trabajoId, calificacion);
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
                <Button variant="contained" color="primary" onClick={handleCalificar} sx={{ marginTop: 2 }}>
                    Enviar Calificación
                </Button>
            </Box>
        </Modal>
    );
};

// Estilos para el modal (puedes personalizarlos)
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