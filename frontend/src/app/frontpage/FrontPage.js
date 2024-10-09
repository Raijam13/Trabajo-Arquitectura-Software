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

  // Estado para almacenar los servicios (se simula que se actualizarán desde la base de datos)
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

  // Estado para la paginación (página actual)
  const [paginaActual, setPaginaActual] = useState(1);
  // Servicios por página (en este caso mostramos 8 servicios por página, 2x4)
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
    // Aquí harías la llamada a la base de datos para obtener las imágenes
    // Por ejemplo, podrías usar fetch para traer los datos y luego actualizar el estado
    // fetch('api/imagenes')
    //   .then(response => response.json())
    //   .then(data => setImagenes(data));
    // fetch('api/servicios')
    //   .then(response => response.json())
    //   .then(data => setServicios(data));
    // fetch('api/trabajadores')
    //   .then(response => response.json())
    //   .then(data => setTrabajadores(data));
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="content">
        {/* Carrusel de imágenes (COMPLETADO)*/}
        <Carousel autoPlay interval={5000} infiniteLoop showThumbs={false} showStatus={false} >
          {imagenes.map((imagen, index) => (
            <div key={index}>
              <img src={imagen} alt={`Imagen ${index + 1}`} />
            </div>
          ))}
        </Carousel>

        {/* Sección dividida en dos partes */}
        <div className="sections">
          {/* Primer sector: Tabla Top Trabajadores (COMPLETADO)*/}
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
                    <td>{index+1}. {trabajador.nombre} ({trabajador.calificacion}/5)</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>  

          {/* Segundo sector: Categorías y productos */}
          <div className="sector sector-2">
            {/* ANUNCIO */}
            <img src="https://via.placeholder.com/1000x200/" alt="Imagen categoría" className="small-image" />

            {/* Subtítulo Categorías */}
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

            {/* Subtítulo Todos los servicios (COMPLETADO)*/}
            <h2>Todos los servicios <span className="light-text">({totalServicios})</span></h2>

            {/* Tabla de servicios 2x4 (COMPLETADO)*/}
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
                          <button className="mas-detalles">Más Detalles</button>
                          <button className="carrito"><FaShoppingCart /></button>
                        </div>
                      </div>
                    </td>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Paginación (simulada) (COMPLETADO)*/}
            <div className="paginacion">
              <button disabled={paginaActual === 1} onClick={() => setPaginaActual(paginaActual - 1)}>Anterior</button>
              <button onClick={() => setPaginaActual(paginaActual + 1)}>Siguiente</button>
            </div>
          </div>
        </div>

      </div>
      <footer className="lower-banner">
          <div className="links">
            <a href="/trabajo">Trabaja con nosotros</a>
            <a href="/terminos">Términos y condiciones</a>
            <a href="/privacidad">Cómo cuidamos tu privacidad</a>
            <a href="/accesibilidad">Accesibilidad</a>
            <a href="/ayuda">Ayuda</a>
          </div>
          <p>Copyright © 2024 Nameless Inc. Todos los derechos reservados.</p>
        </footer>
    </div>
  );
}

export default App;
