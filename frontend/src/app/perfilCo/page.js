'use client';

import React, { useState, useEffect } from 'react';
import Styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { FaHome, FaUserAlt, FaBriefcase, FaClipboardList, FaHistory, FaStar } from 'react-icons/fa';
import { getimgperfil, getcomentarios } from '../../api/perfil'; // Importar funciones necesarias

const PerfilComentario = () => {
    const [usuario, setUsuario] = useState({
        nombre: 'Usuario desconocido',
        profesion: 'Sin profesión',
        foto: 'https://via.placeholder.com/100',
        puntuacion: 0, // Puntuación inicial
    });

    const [comentarios, setComentarios] = useState([]); // Lista de comentarios
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    router.push('/login');
                    return;
                }

                // Obtener información del usuario
                const userResponse = await fetch('http://localhost:3009/users/me', {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${token}` },
                });
                const userData = await userResponse.json();
                const userId = userData._id;

                // Obtener imagen de perfil
                const imagenPerfil = await getimgperfil(userId);

                // Obtener comentarios del cliente
                const comentariosData = await getcomentarios(userId);

                setUsuario({
                    nombre: userData.nombre_completo,
                    profesion: userData.actividadEconomica || '',
                    foto: imagenPerfil || 'https://via.placeholder.com/100',
                    puntuacion: userData.puntuacion || 0, // Asumimos que la puntuación está disponible en el perfil
                });

                setComentarios(comentariosData); // Asignar los comentarios al estado
            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
                router.push('/login');
            }
        };

        fetchUserData();
    }, []);

    const navigateTo = (path) => {
        router.push(path);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    return (
        <div className={Styles.layout}>
            <aside className={Styles.sidebar}>
                <h2 className={Styles.sidebarTitle}>A Tu Puerta!</h2>
                <ul className={Styles.menu}>
                    <li onClick={() => navigateTo('/home')}>
                        <FaHome className={Styles.icon} /> Home
                    </li>
                    <li
                        onClick={() => navigateTo('/perfil')}
                        className={Styles.perfilActive}
                    >
                        <FaUserAlt className={Styles.icon} /> Perfil
                    </li>
                    <li onClick={() => navigateTo('/trabajos')}>
                        <FaBriefcase className={Styles.icon} /> Trabajos
                    </li>
                    <li onClick={() => navigateTo('/postulaciones')}>
                        <FaClipboardList className={Styles.icon} /> Mis Postulaciones
                    </li>
                    <li onClick={() => navigateTo('/historial')}>
                        <FaHistory className={Styles.icon} /> Historial
                    </li>
                </ul>
            </aside>

            <main className={Styles.main}>
                <div className={Styles.header}>
                    <div className={Styles.avatar}>
                        <img src={usuario.foto} alt="Avatar del usuario" className={Styles.avatarImg} />
                    </div>
                    <div className={Styles.userInfo}>
                        <h2 className={Styles.userName}>
                            {usuario.nombre}
                            <span className={Styles.puntuacion}>
                                <FaStar className={Styles.starIcon} /> {usuario.puntuacion}
                            </span>
                        </h2>
                        <p className={Styles.userProfesion}>{usuario.profesion}</p>
                    </div>
                    <button onClick={handleLogout} className={Styles.logoutButton}>Logout</button>
                </div>

                <div className={Styles.container}>
                    <h2 className={Styles.titulo}>Comentarios de Clientes</h2>
                    <div className={Styles.comentarios}>
                        {comentarios.length > 0 ? (
                            comentarios.map((comentario, index) => (
                                <div key={index} className={Styles.comentarioCard}>
                                    <img
                                        src={comentario.imagen || 'https://via.placeholder.com/50'}
                                        alt="Imagen del comentarista"
                                        className={Styles.comentarioAvatar}
                                    />
                                    <div>
                                        <h4 className={Styles.comentarioNombre}>{comentario.nombre}</h4>
                                        <p className={Styles.comentarioTexto}>{comentario.texto}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className={Styles.noComentarios}>No hay comentarios aún.</p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PerfilComentario;
