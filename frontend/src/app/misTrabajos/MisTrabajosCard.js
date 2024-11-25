import React from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import Styles from './MisTrabajosCard.css';
import CalificacionModal from './CalificacionModal';  // Importar el modal

const MisTrabajosCard = ({ trabajo, onActualizarEstado, onEliminar, onCalificar }) => {
    const [openModal, setOpenModal] = useState(false);
    
    // Función para determinar el texto del botón según el estado actual
    const siguienteEstado = (estado) => {
        switch (estado) {
            case 'EN_PROCESO':
                return 'FINALIZADO';
            case 'FINALIZADO':
                return 'CALIFICADO';
            default:
                return null;
        }
    };

    const textoBoton = (estado) => {
        switch (estado) {
            case 'EN_PROCESO':
                return 'Finalizar';
            case 'FINALIZADO':
                return 'Calificar';
            default:
                return null;
        }
    };

    const handleCalificar = () => {
        setOpenModal(true);  // Mostrar el modal de calificación
    };

    const handleCloseModal = () => {
        setOpenModal(false);  // Cerrar el modal
    };

    const handleEnviarCalificacion = (trabajoId, calificacion) => {
        onCalificar(trabajoId, calificacion);  // Enviar calificación al backend
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

                {/* Información del usuario */}
                <Typography variant="body2" className={Styles.cardUsuario}>
                    Usuario: {trabajo.usuario?.nombre_completo || 'No disponible'}
                </Typography>

                {/* Información del vendedor */}
                <Typography variant="body2" className={Styles.cardVendedor}>
                    Vendedor: {trabajo.vendedor?.nombre_completo || 'No disponible'}
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
                                onClick={() => onActualizarEstado(trabajo._id, siguienteEstado(trabajo.estado))}
                            >
                                {textoBoton(trabajo.estado)}
                            </Button>
                        </Grid>
                    )}
                    {trabajo.estado === 'FINALIZADO' && (
                        <Grid item>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleCalificar}  // Llamar a la función para abrir el modal
                            >
                                Calificar
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
            {/* Modal de Calificación */}
            <CalificacionModal
                open={openModal}
                onClose={handleCloseModal}
                onSubmit={handleEnviarCalificacion}
                trabajoId={trabajo._id}
            />
        </Card>
    );
};

export default MisTrabajosCard;
