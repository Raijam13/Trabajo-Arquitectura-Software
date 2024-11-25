'use client';

import React, { useState, useEffect } from 'react';
import Styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { FaHome, FaUserAlt, FaBriefcase, FaClipboardList, FaHistory } from 'react-icons/fa';
import { getimgperfil, getcompletoperfil,getContacto } from '../../api/perfil'; // Importar funciones existentes



const EditarPerfil = () => {
    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        edad: '',
        password: '',
        email: '',
        telefono: '',
        habilidades: '',
    });

    const [usuario, setUsuario] = useState({
        nombre: 'Usuario desconocido',
        profesion: 'Sin profesión',
        foto: 'https://via.placeholder.com/100',
    });

    const [mensaje, setMensaje] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    router.push('/login');
                    return;
                }

                const userResponse = await fetch('http://localhost:3009/users/me', {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${token}` },
                });
                const userData = await userResponse.json();
                const userId = userData._id;

                const usuarioData = userData.nombre_completo;
                const imagenPerfil = await getimgperfil(userId);
                const actividadEconomica = await getcompletoperfil(userId);
                const contactoData = await getContacto(userId);

                const [nombres, ...apellidosArr] = (usuarioData || '').split(' ');
                const apellidos = apellidosArr.join(' ');

                setFormData({
                    nombres: nombres || '',
                    apellidos: apellidos || '',
                    edad: contactoData.edad || '',
                    telefono: contactoData.telefono || '',
                    habilidades: actividadEconomica || '', // Asignar habilidades solo si hay actividadEconomica
                });

                setUsuario({
                    nombre: `${nombres} ${apellidos}`,
                    profesion: actividadEconomica || '', // Profesión basada en actividadEconomica
                    foto: imagenPerfil || 'https://via.placeholder.com/100',
                });
            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
                router.push('/login');
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            const nombre_completo = `${formData.nombres} ${formData.apellidos}`;
            const response = await fetch('http://localhost:3009/users/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    nombre_completo,
                    edad: formData.edad,
                    password: formData.password,
                    gmail: formData.email,
                    telefono: formData.telefono,
                    actividadEconomica: formData.habilidades,
                }),
            });

            if (response.ok) {
                setMensaje('Perfil actualizado con éxito.');
            } else {
                setMensaje('Hubo un problema al actualizar el perfil.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMensaje('Ocurrió un error inesperado.');
        }
    };

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
                    {/* Mostrar "Mis Postulaciones" solo si hay actividadEconomica */}
                    {formData.habilidades && (
                        <li onClick={() => navigateTo('/postulaciones')}>
                            <FaClipboardList className={Styles.icon} /> Mis Postulaciones
                        </li>
                    )}
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
                        <h2 className={Styles.userName}>{usuario.nombre}</h2>
                        {usuario.profesion && <p className={Styles.userProfesion}>{usuario.profesion}</p>}
                    </div>
                    <button onClick={handleLogout} className={Styles.logoutButton}>Logout</button>
                </div>

                <div className={Styles.container}>
                    <h2 className={Styles.titulo}>Editar Perfil</h2>
                    {mensaje && <p className={Styles.mensaje}>{mensaje}</p>}
                    <form className={Styles.form} onSubmit={handleSubmit}>
                        <label className={Styles.label}>
                            Nombres:
                            <input
                                type="text"
                                name="nombres"
                                className={Styles.input}
                                value={formData.nombres}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <label className={Styles.label}>
                            Apellidos:
                            <input
                                type="text"
                                name="apellidos"
                                className={Styles.input}
                                value={formData.apellidos}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <label className={Styles.label}>
                            Edad:
                            <input
                                type="number"
                                name="edad"
                                className={Styles.input}
                                value={formData.edad}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label className={Styles.label}>
                            Teléfono:
                            <input
                                type="text"
                                name="telefono"
                                className={Styles.input}
                                value={formData.telefono}
                                onChange={handleInputChange}
                            />
                        </label>
                        {formData.habilidades ? (
                        <label className={Styles.label}>
                            Habilidades:
                            <select
                                name="habilidades"
                                className={Styles.select}
                                value={formData.habilidades}
                                onChange={() => {}}
                                disabled // Deshabilitado para evitar modificaciones
                            >
                                <option value={formData.habilidades}>
                                    {formData.habilidades}
                                </option>
                            </select>
                        </label>
                    ) : (
                        <p className={Styles.infoCliente}></p>
                    )}
                        <button type="submit" className={Styles.btnGuardar}>
                            Guardar
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default EditarPerfil;
