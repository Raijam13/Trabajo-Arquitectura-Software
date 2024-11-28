'use client';

import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab, Alert, Grid, Pagination, Button } from '@mui/material';
import MisTrabajosCard from './MisTrabajosCard';
import CalificacionModal from './CalificacionModal';
import { getServiciosPorEstado, finalizarTrabajo, eliminarTrabajo, calificarTrabajo } from '../../api/trabajo';
import Banner from '../frontpage/components/Header.js';
import Styles from './MisTrabajos.css';

const MisTrabajos = () => {
    const [trabajos, setTrabajos] = useState([]);
    const [estadoFiltro, setEstadoFiltro] = useState('EN_PROCESO'); // Estado inicial
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const itemsPerPage = 6;
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [trabajoIdCalificar, setTrabajoIdCalificar] = useState(null);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const trabajosCargados = await getServiciosPorEstado(estadoFiltro);
                setTrabajos(trabajosCargados);
                const response = await fetch('http://localhost:3009/users/me', {
                    method: 'GET',
                    headers: { 
                        'Authorization': `Bearer ${localStorage.getItem('token')}` 
                    },
                });    
                const usuario = await response.json();
                setNombreUsuario(usuario.nombre_completo);
            } catch (err) {
                setError('Error al cargar los datos: ' + err.message);
            }
        };
    
        cargarDatos();
    }, [estadoFiltro]);

    const handleEstadoChange = (event, newValue) => {
        setEstadoFiltro(newValue);
        setPage(1); // Resetear la página al cambiar de estado
    };

    const handleEliminarTrabajo = async (id) => {
        const success = await eliminarTrabajo(id);
        if (success) {
            setTrabajos(trabajos.filter(trabajo => trabajo._id !== id));
        } else {
            console.error('No se pudo eliminar el trabajo');
        }
    };

    const handleFinalizarTrabajo = async (id) => {
        try {
            const success = await finalizarTrabajo(id);
            if (success) {
                setTrabajos(trabajos => trabajos.map(trabajo =>
                    trabajo._id === id ? { ...trabajo, estado: 'FINALIZADO' } : trabajo
                ));
            } else {
                alert('No se pudo finalizar el trabajo');
            }
        } catch (error) {
            console.error('Error al finalizar el trabajo:', error);
        }
    };

    const handleCalificarTrabajo = (id) => {
        setTrabajoIdCalificar(id);
        setModalOpen(true);
    };

    const handleSubmitCalificacion = async (id, calificacion, comentario) => {
        try {
            const trabajoActualizado = await calificarTrabajo(id, calificacion, comentario);
            if (trabajoActualizado) {
                setTrabajos(trabajos => trabajos.map(trabajo =>
                    trabajo._id === id ? { ...trabajo, estado: 'CALIFICADO' } : trabajo
                ));
            } else {
                console.error('No se pudo calificar el trabajo');
            }
        } catch (err) {
            console.error('Error al calificar el trabajo:', err.message);
        }
    };

    const trabajosFiltrados = trabajos.filter(trabajo => trabajo.estado === estadoFiltro);
    const paginatedTrabajos = trabajosFiltrados.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <>
            <Banner />
            <Box className={Styles.container} sx={{ marginTop: '100px' }}>
                {nombreUsuario && <h2 className={Styles.welcomeMessage}>Bienvenido, {nombreUsuario}</h2>}

                {/* Tabs para los estados de los trabajos */}
                <Tabs value={estadoFiltro} onChange={handleEstadoChange} centered>
                    <Tab label="En Proceso" value="EN_PROCESO" />
                    <Tab label="Finalizado" value="FINALIZADO" />
                    <Tab label="Calificado" value="CALIFICADO" />
                </Tabs>

                {/* Mensaje de error */}
                {error && (
                    <Alert severity="error" className={Styles.errorAlert}>
                        {error}
                    </Alert>
                )}

                {/* Listado de trabajos */}
                <Grid container spacing={2} justifyContent="center" className={Styles.trabajosContainer}>
                    {paginatedTrabajos.length > 0 ? (
                        paginatedTrabajos.map(trabajo => (
                            <Grid item xs={12} sm={6} md={4} key={trabajo._id}>
                                <MisTrabajosCard
                                    trabajo={trabajo}
                                    onFinalizar={handleFinalizarTrabajo}
                                    onCalificar={handleCalificarTrabajo}
                                    onEliminar={() => handleEliminarTrabajo(trabajo._id)}
                                />
                            </Grid>
                        ))
                    ) : (
                        <p className={Styles.noTrabajosMessage}>No hay trabajos disponibles en este estado.</p>
                    )}
                </Grid>

                {/* Paginación */}
                <Pagination
                    count={Math.ceil(trabajosFiltrados.length / itemsPerPage)}
                    page={page}
                    onChange={(event, value) => setPage(value)}
                    className={Styles.pagination}
                />
            </Box>

            {/* Modal de Calificación */}
            <CalificacionModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmitCalificacion}
                trabajoId={trabajoIdCalificar}
            />
        </>
    );
};

export default MisTrabajos;