import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';

const MisTrabajosCard = ({ trabajo, onActualizarEstado, onEliminar }) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5">{trabajo.titulo}</Typography>
                <Typography color="textSecondary">Estado: {trabajo.estado}</Typography>
                <Typography>{trabajo.descripcion}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={() => onActualizarEstado('EN_PROCESO')}>
                    Iniciar Trabajo
                </Button>
                <Button size="small" color="secondary" onClick={onEliminar}>
                    Eliminar
                </Button>
            </CardActions>
        </Card>
    );
};

export default MisTrabajosCard;
