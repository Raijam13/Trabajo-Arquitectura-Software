'use client';
import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab, Alert, Grid, Pagination, Button, AppBar, Toolbar, Typography, Container } from '@mui/material';
import MisTrabajosCard from './MisTrabajosCard';
import { obtenerTrabajos, actualizarEstadoTrabajo, eliminarTrabajo } from '../../api/trabajo';
import Styles from './MisTrabajos.css';

const MisTrabajos = () => {
    const [trabajos, setTrabajos] = useState([]);
    const [estadoFiltro, setEstadoFiltro] = useState('EN_REVISION');
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

                const trabajosCargados = await obtenerTrabajos();
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
            setTrabajos(trabajos.filter(trabajo => trabajo.id !== id));
        } else {
            console.error('No se pudo eliminar el trabajo');
        }
    };

    const paginatedTrabajos = trabajos.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <Box className={Styles.container}>
            {/* Encabezado */}
            <AppBar position="static" className={Styles.header}>
                <Toolbar>
                    <Typography variant="h6" className={Styles.logo}>
                        LaboraPE
                    </Typography>
                    <Box className={Styles.navButtons}>
                        <Button className={Styles.navButton} onClick={() => console.log('Publica tu actividad')}>
                            Publica tu actividad
                        </Button>
                        <Button className={Styles.navButton} onClick={() => console.log('Ver Propuestas')}>
                            Ver Propuestas
                        </Button>
                        <Button className={Styles.navButton} onClick={() => console.log('Mis Trabajos')}>
                            Mis Trabajos
                        </Button>
                        <Button className={Styles.navButton} onClick={() => console.log('Perfil')}>
                            Perfil
                        </Button>
                        <Button
                            className={Styles.logoutButton}
                            onClick={() => console.log('Cerrar Sesión')}
                        >
                            Cerrar Sesión
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>


            {/* Bienvenida */}
            {nombreUsuario && <h2 className={Styles.welcomeMessage}>Bienvenido, {nombreUsuario}</h2>}

            {/* Tabs para los estados de los trabajos */}
            <Tabs value={estadoFiltro} onChange={handleEstadoChange} centered>
                <Tab label="En Revisión" value="EN_REVISION" />
                <Tab label="Publicado" value="PUBLICADO" />
                <Tab label="Rechazado" value="RECHAZADO" />
                <Tab label="Aceptado" value="ACEPTADO" />
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
                        <Grid item xs={12} sm={6} md={4} key={trabajo.id}>
                            <MisTrabajosCard
                                trabajo={trabajo}
                                onActualizarEstado={(nuevoEstado) => actualizarEstadoTrabajo(trabajo.id, nuevoEstado)}
                                onEliminar={() => handleEliminarTrabajo(trabajo.id)}
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
    );
};

export default MisTrabajos;