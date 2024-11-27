'use client';
import { useRouter } from 'next/navigation'; // Importar el router para redirección
import Styles from './page.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'next/image';
import Header from '../frontpage/components/Header';
import { Carousel } from 'react-responsive-carousel';

import React, { useState } from 'react';

import Barra from '../../components/barra.jsx';

const Home = () => {
    const router = useRouter(); // Hook para manejar redirecciones

    const [searchTerm, setSearchTerm] = useState(''); // Estado para manejar el término de búsqueda
    const [resultados, setResultados] = useState([]); // Estado para manejar los resultados de la búsqueda

    // Simulación de datos
    const datos = [
        { id: 1, titulo: 'Servicio de limpieza', descripcion: 'Limpieza profesional para tu hogar.', imagen: 'https://via.placeholder.com/200' },
        { id: 2, titulo: 'Reparación de electrodomésticos', descripcion: 'Arreglo de lavadoras, neveras, y más.', imagen: 'https://via.placeholder.com/200' },
        { id: 3, titulo: 'Pintura de interiores', descripcion: 'Renueva tus espacios con pintura profesional.', imagen: 'https://via.placeholder.com/200' },
        { id: 4, titulo: 'Cuidado de jardines', descripcion: 'Servicio de jardinería y mantenimiento.', imagen: 'https://via.placeholder.com/200' },
    ];

    // Manejar el cambio en la barra de búsqueda
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value); // Actualizar el término de búsqueda
    };

    // Manejar el evento de búsqueda
    const handleSearch = () => {
        // Filtrar los resultados basados en el término de búsqueda
        const resultadosFiltrados = datos.filter((item) =>
            item.titulo.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setResultados(resultadosFiltrados); // Actualizar el estado de resultados
    };

    return (
        <div className={Styles.render}>
            <Header />

            {/* Barra de búsqueda */}
            <div className="container my-4">
                <Form className="d-flex">
                    <Form.Control
                        type="text"
                        placeholder="Buscar servicios..."
                        className="me-2"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <Button variant="primary" onClick={handleSearch}>
                        Buscar
                    </Button>
                </Form>
            </div>

            <div className={Styles.page}>
                {/* Sección de filtros */}
                <div className={Styles.filtro}>
                    <h4>Filtrar búsqueda</h4>
                    <p>Opciones de filtro (aún no implementadas).</p>
                </div>

                {/* Resultados de búsqueda */}
                <div className={Styles.resultados}>
                    <h4>Resultados:</h4>
                    {resultados.length > 0 ? (
                        <div className="row">
                            {resultados.map((item) => (
                                <div key={item.id} className="col-md-4 mb-4">
                                    <div className="card">
                                        <Image
                                            src={item.imagen}
                                            alt={item.titulo}
                                            width={200}
                                            height={200}
                                            className="card-img-top"
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{item.titulo}</h5>
                                            <p className="card-text">{item.descripcion}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No hay resultados para mostrar.</p>
                    )}
                </div>

                {/* Descripción adicional */}
                <div className={Styles.descrip}>
                    <h4>¿No encuentras lo que buscas?</h4>
                    <p>Explora nuestras categorías o ponte en contacto con nosotros.</p>
                </div>
            </div>

            <footer className={`${Styles.font} ${Styles['lower-banner']}`}>
                <div className={Styles.links}>
                    <a href="">Trabaja con nosotros</a>
                    <a href="">Términos y condiciones</a>
                    <a href="">Cómo cuidamos tu privacidad</a>
                    <a href="">Accesibilidad</a>
                    <a href="">Ayuda</a>
                </div>
                <p>Copyright © 2024 A Tu Puerta. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default Home;
