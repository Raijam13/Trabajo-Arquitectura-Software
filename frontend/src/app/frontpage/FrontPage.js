import React, { useState, useEffect } from 'react';
import './FrontPage.css';
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
    <div className="App">
      <Header />
      <div className="content">
        {/* Mostrar la ubicación del usuario */}
        {location.lat && location.lng ? (
          <p>Tu ubicación: Latitud {location.lat}, Longitud {location.lng}</p>
        ) : (
          <p>{errorLocation ? errorLocation : "Obteniendo ubicación..."}</p>
        )}

        {/* Carrusel de imágenes */}
        <Carousel autoPlay interval={5000} infiniteLoop showThumbs={false} showStatus={false} >
          {imagenes.map((imagen, index) => (
            <div key={index}>
              <img src={imagen} alt={`Imagen ${index + 1}`} />
            </div>
          ))}
        </Carousel>

        {/* Resto del contenido */}
        <div className="sections">
          {/* Top Trabajadores */}
          <div className="sector sector-1">
            <h2>Top 10 Trabajadores</h2>
            <table>
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
          <div className="sector sector-2">
            <img src="https://via.placeholder.com/1000x200/" alt="Imagen categoría" className="small-image" />
            <h2>Categorías</h2>
            <div className="categories">
              <button className="category-button"><FaWrench /> Electricista</button>
              <button className="category-button"><FaUtensils /> Cocinero</button>
              <button className="category-button"><FaBroom /> Aseo</button>
              <button className="category-button"><FaShower /> Gasfitería</button>
              <button className="category-button"><FaTree /> Jardinería</button>
              <button className="category-button"><FaLock /> Cerrajeros</button>
              <button className="category-button"><FaEllipsisH /> Más</button>
            </div>
            <h2>Todos los servicios <span className="light-text">({totalServicios})</span></h2>
            <div className="tabla-servicios">
              <table>
                <tbody>
                  {serviciosActuales.map((servicio, index) => (
                    <td key={servicio.id}>
                      <div className="servicio">
                        <img src={servicio.img} alt={servicio.titulo} />
                        <h3>{servicio.titulo}</h3>
                        <p className="descripcion">{servicio.descripcion}</p>
                        <p className="costo"><strong>{servicio.costo}</strong></p>
                        <div className="botones">
                          <button className="agregar-btn"><FaShoppingCart /> Agregar</button>
                        </div>
                      </div>
                    </td>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
