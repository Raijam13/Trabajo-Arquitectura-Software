'use client';

import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab, Alert, Grid, Pagination, Button } from '@mui/material';
import MisTrabajosCard from './MisTrabajosCard';
import { obtenerTrabajosCliente, actualizarEstadoTrabajo, eliminarTrabajo } from '../../api/trabajo';
import Banner from '../frontpage/components/Header.js';
import Styles from './MisTrabajos.css';

const MisTrabajos = () => {
    const [trabajos, setTrabajos] = useState([]);
    const [estadoFiltro, setEstadoFiltro] = useState('EN_PROCESO'); // Estado inicial
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const itemsPerPage = 4;
    const [nombreUsuario, setNombreUsuario] = useState('');

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('No se encontró un token. Inicia sesión.');
                    return;
                }

                // Obtener información del cliente (ID)
                const userResponse = await fetch('http://localhost:3009/users/me', {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (userResponse.status === 401) {
                    setError('No autorizado. Inicia sesión nuevamente.');
                    return;
                }

                const userData = await userResponse.json();
                setNombreUsuario(userData.nombre_completo);

                // Cargar trabajos según el cliente
                const trabajosCargados = await obtenerTrabajosCliente(userData._id);
                setTrabajos(trabajosCargados.filter(trabajo => trabajo.estado === estadoFiltro));
            } catch (err) {
                setError('Error al cargar los datos: ' + err.message);
            }
        };

        cargarDatos();
    }, [estadoFiltro]);

    const handleEstadoChange = (event, newValue) => {
        setEstadoFiltro(newValue);
    };

    const handleEliminarTrabajo = async (id) => {
        const success = await eliminarTrabajo(id);
        if (success) {
            setTrabajos(trabajos.filter(trabajo => trabajo._id !== id));
        } else {
            console.error('No se pudo eliminar el trabajo');
        }
    };

    const handleActualizarEstado = async (id, nuevoEstado) => {
        try {
            const trabajoActualizado = await actualizarEstadoTrabajo(id, nuevoEstado);
            setTrabajos(trabajos.map(trabajo =>
                trabajo._id === id ? { ...trabajo, estado: trabajoActualizado.estado } : trabajo
            ));
        } catch (err) {
            console.error('Error al actualizar el estado:', err.message);
        }
    };

    const paginatedTrabajos = trabajos.slice((page - 1) * itemsPerPage, page * itemsPerPage);

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
                                    onActualizarEstado={nuevoEstado => handleActualizarEstado(trabajo._id, nuevoEstado)}
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
                    count={Math.ceil(trabajos.length / itemsPerPage)}
                    page={page}
                    onChange={(event, value) => setPage(value)}
                    className={Styles.pagination}
                />
            </Box>
        </>
    );
};

export default MisTrabajos;
