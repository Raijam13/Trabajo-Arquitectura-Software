'use client';

import React, { useState, useEffect } from 'react';
import Styles from './page.module.css';
import Header from './components/Header';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { FaWrench, FaUtensils, FaBroom, FaShower, FaTree, FaLock, FaEllipsisH, FaShoppingCart } from 'react-icons/fa';

function App() {

  // Estado para almacenar las imágenes del carrusel
  const [imagenes, setImagenes] = useState([
    "https://via.placeholder.com/1200x300", 
    "https://via.placeholder.com/1200x300", 
    "https://via.placeholder.com/1200x300"
  ]);

  // Estado para la geolocalización del usuario
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [errorLocation, setErrorLocation] = useState(null);

  // Estado para almacenar los servicios
  const [servicios, setServicios] = useState([
    { id: 1, img: "https://via.placeholder.com/150", titulo: "Servicio 1", descripcion: "Descripción del servicio 1", costo: "S/ 100" },
    { id: 2, img: "https://via.placeholder.com/150", titulo: "Servicio 2", descripcion: "Descripción del servicio 2", costo: "S/ 150" },
    { id: 3, img: "https://via.placeholder.com/150", titulo: "Servicio 3", descripcion: "Descripción del servicio 3", costo: "S/ 200" },
    { id: 4, img: "https://via.placeholder.com/150", titulo: "Servicio 4", descripcion: "Descripción del servicio 4", costo: "S/ 250" },
    { id: 5, img: "https://via.placeholder.com/150", titulo: "Servicio 5", descripcion: "Descripción del servicio 5", costo: "S/ 300" },
    { id: 6, img: "https://via.placeholder.com/150", titulo: "Servicio 6", descripcion: "Descripción del servicio 6", costo: "S/ 350" },
    { id: 7, img: "https://via.placeholder.com/150", titulo: "Servicio 7", descripcion: "Descripción del servicio 7", costo: "S/ 400" },
    { id: 8, img: "https://via.placeholder.com/150", titulo: "Servicio 8", descripcion: "Descripción del servicio 7", costo: "S/ 400" },
    { id: 9, img: "https://via.placeholder.com/150", titulo: "Servicio 9", descripcion: "Descripción del servicio 8", costo: "S/ 450" }
  ]);
  const totalServicios = servicios.length;

  // Estado para la paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const serviciosPorPagina = 8;
  const indiceUltimoServicio = paginaActual * serviciosPorPagina;
  const indicePrimerServicio = indiceUltimoServicio - serviciosPorPagina;
  const serviciosActuales = servicios.slice(indicePrimerServicio, indiceUltimoServicio);

  // Estado para almacenar los trabajadores
  const [trabajadores, setTrabajadores] = useState([
    { id: 1, nombre: "Juan Pérez", calificacion: 5, rol: "Electricista" },
    { id: 2, nombre: "María García", calificacion: 4, rol: "Cocinera" },
    { id: 3, nombre: "Carlos Rodríguez", calificacion: 5, rol: "Jardinero" },
    { id: 4, nombre: "Lucía Fernández", calificacion: 4, rol: "Cerrajera" },
    { id: 5, nombre: "Pedro Martínez", calificacion: 3, rol: "Gasfitero" },
    { id: 6, nombre: "Ana López", calificacion: 2, rol: "Chofer" },
    { id: 7, nombre: "José Sánchez", calificacion: 4, rol: "Fontanero" },
    { id: 8, nombre: "Luis Ramírez", calificacion: 3, rol: "Mecánico" },
    { id: 9, nombre: "Laura Gómez", calificacion: 5, rol: "Asistente Doméstica" },
    { id: 10, nombre: "Roberto Díaz", calificacion: 3, rol: "Pintor" },
    { id: 11, nombre: "Marta González", calificacion: 4, rol: "Costurera" }
  ]);
  const trabajadoresOrdenados = [...trabajadores].sort((a, b) => b.calificacion - a.calificacion).slice(0, 10);

  useEffect(() => {
    // Detectar la geolocalización del usuario
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          setErrorLocation("Error obteniendo la ubicación: " + error.message);
        }
      );
    } else {
      setErrorLocation("Geolocalización no soportada por este navegador.");
    }
  }, []);

  return (
    <div className={Styles.App}>
      <Header />
      <div className={`${Styles.content} ${Styles.render}`}>
        {/* Mostrar la ubicación del usuario */}
        {location.lat && location.lng ? (
          <p>Tu ubicación: Latitud {location.lat}, Longitud {location.lng}</p>
        ) : (
          <p>{errorLocation ? errorLocation : "Obteniendo ubicación..."}</p>
        )}
        

        {/* Carrusel de imágenes */}
        <div className={Styles.carouselContainer}>
          <Carousel autoPlay interval={5000} infiniteLoop showThumbs={false} showStatus={false}>
            {imagenes.map((imagen, index) => (
              <div key={index}>
                <img src={imagen} alt={`Imagen ${index + 1}`} />
              </div>
            ))}
          </Carousel>
        </div>

        {/* Resto del contenido */}
        <div className={Styles.sections}>
          {/* Top Trabajadores */}
          <div className={`${Styles.sector} ${Styles.sector1}`}>
            <h2 className={Styles.heading}>Top Trabajadores</h2>
            <table className={Styles.table}>
              <thead>
                <tr>
                  <th>Nombre</th>
                </tr>
              </thead>
              <tbody>
                {trabajadoresOrdenados.map((trabajador, index) => (
                  <tr key={index}>
                    <td>{index + 1}. {trabajador.nombre} ({trabajador.calificacion}/5)</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>  

          {/* Servicios */}
          <div className={`${Styles.sector} ${Styles.sector2}`}>
            <img src="https://via.placeholder.com/1000x200/" alt="Imagen categoría" className={Styles['small-image']} />
            <h2 className={Styles.heading}>Categorías</h2>
            <div className={Styles.categories}>
              <button className={Styles['category-button']}><FaWrench /> Electricista</button>
              <button className={Styles['category-button']}><FaUtensils /> Cocinero</button>
              <button className={Styles['category-button']}><FaBroom /> Aseo</button>
              <button className={Styles['category-button']}><FaShower /> Gasfitería</button>
              <button className={Styles['category-button']}><FaTree /> Jardinería</button>
              <button className={Styles['category-button']}><FaLock /> Cerrajeros</button>
              <button className={Styles['category-button']}><FaEllipsisH /> Más</button>
            </div>
            <h2 className={Styles.heading}>Todos los servicios <span className={Styles['light-text']}>({totalServicios})</span></h2>
            <div className={Styles['tabla-servicios']}>
              <div className={Styles.gridContainer}>
                {serviciosActuales.map((servicio) => (
                  <div className={Styles.servicioCard} key={servicio.id}>
                    <img src={servicio.img} alt={servicio.titulo} />
                    <h3>{servicio.titulo}</h3>
                    <p className={Styles.descripcion}>{servicio.descripcion}</p>
                    <p className={Styles.costo}><strong>{servicio.costo}</strong></p>
                    <div className={Styles.botones}>
                      <button className={Styles['mas-detalles']}>Más Detalles</button>
                      <button className={Styles.carrito}><FaShoppingCart /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Paginación */}
            <div className={Styles.paginacion}>
              <button disabled={paginaActual === 1} onClick={() => setPaginaActual(paginaActual - 1)}>Anterior</button>
              <button onClick={() => setPaginaActual(paginaActual + 1)}>Siguiente</button>
            </div>
          </div>
        </div>
      </div>
      <footer className={`${Styles.render} ${Styles['lower-banner']}`}>
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
}

export default App;
