import React from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import Styles from './MisTrabajosCard.css';

const MisTrabajosCard = ({ trabajo, onActualizarEstado, onEliminar }) => {
    // Función para determinar el texto del botón según el estado actual
    const siguienteEstado = (estado) => {
        switch (estado) {
            case 'EN_PROCESO':
                return 'Finalizar';
            case 'FINALIZADO':
                return 'Calificar';
            default:
                return null;
        }
    };

    return (
        <Card className={Styles.card} variant="outlined">
            <CardContent>
                {/* Información del título y descripción */}
                <Typography variant="h5" className={Styles.cardTitle}>
                    {trabajo.titulo}
                </Typography>
                <Typography variant="body1" className={Styles.cardDescription}>
                    {trabajo.servicio_description}
                </Typography>

                {/* Estado del trabajo */}
                <Typography variant="body2" className={Styles.cardEstado}>
                    Estado: {trabajo.estado}
                </Typography>

                {/* Información del cliente */}
                <Typography variant="body2" className={Styles.cardCliente}>
                    Cliente: {trabajo.cliente?.nombre_completo || 'No disponible'}
                </Typography>

                {/* Información del trabajador */}
                <Typography variant="body2" className={Styles.cardTrabajador}>
                    Trabajador: {trabajo.trabajador?.nombre_completo || 'No disponible'}
                </Typography>

                {/* Costo del trabajo */}
                <Typography variant="body2" className={Styles.cardCosto}>
                    Costo: S/{trabajo.costo_promedio}
                </Typography>

                {/* Botones de acción */}
                <Grid container spacing={1} justifyContent="flex-end">
                    {siguienteEstado(trabajo.estado) && (
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => onActualizarEstado(siguienteEstado(trabajo.estado))}
                            >
                                {siguienteEstado(trabajo.estado)}
                            </Button>
                        </Grid>
                    )}
                    <Grid item>
                        <Button variant="contained" color="secondary" onClick={onEliminar}>
                            Eliminar
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default MisTrabajosCard;
