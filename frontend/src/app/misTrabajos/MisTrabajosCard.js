import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import Styles from './MisTrabajosCard.css';

const MisTrabajosCard = ({ trabajo, onFinalizar, onCalificar, onEliminar }) => {
    const handleActualizarEstado = () => {
        if (trabajo.estado === 'EN_PROCESO') {
            onFinalizar(trabajo._id);
        } else if (trabajo.estado === 'FINALIZADO') {
            onCalificar(trabajo._id);
        }
    };

    return (
        <Card className={Styles.card} variant="outlined">
            <CardContent>
                <Typography variant="h5" className={Styles.cardTitle}>
                    {trabajo.titulo}
                </Typography>
                <Typography variant="body1" className={Styles.cardDescription}>
                    {trabajo.servicio_description}
                </Typography>
                <Typography variant="body2" className={Styles.cardEstado}>
                    Estado: {trabajo.estado}
                </Typography>
                <Typography variant="body2" className={Styles.cardUsuario}>
                    Usuario: {trabajo.usuario?.nombre_completo || 'No disponible'}
                </Typography>
                <Typography variant="body2" className={Styles.cardVendedor}>
                    Vendedor: {trabajo.vendedor?.nombre_completo || 'No disponible'}
                </Typography>
                {trabajo.estado === 'CALIFICADO' && (
                    <>
                        <Typography variant="body2" className={Styles.cardCalificacion}>
                            Calificación: {trabajo.calificacion} / 5
                        </Typography>
                        <Typography variant="body2" className={Styles.cardComentario}>
                            Comentario: {trabajo.comentario}
                        </Typography>
                    </>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleActualizarEstado}
                    disabled={trabajo.estado === 'CALIFICADO'}
                >
                    {trabajo.estado === 'EN_PROCESO' ? 'Finalizar' : 'Calificar'}
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => onEliminar(trabajo._id)}
                    style={{ marginLeft: '10px' }}
                >
                    Eliminar
                </Button>
            </CardContent>
        </Card>
    );
};

export default MisTrabajosCard;