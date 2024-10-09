import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import './Header.css';

function Banner() {
  const [carritoVisible, setCarritoVisible] = useState(false);

  // Estado para almacenar los elementos del carrito (ejemplo estático)
  const [carrito, setCarrito] = useState([
    { id: 1, titulo: "Servicio 1", precio: "S/ 100", img: "https://via.placeholder.com/50" },
    { id: 2, titulo: "Servicio 2", precio: "S/ 150", img: "https://via.placeholder.com/50" },
    { id: 3, titulo: "Servicio 3", precio: "S/ 200", img: "https://via.placeholder.com/50" }
  ]);

  const totalCarrito = carrito.reduce((total, item) => total + parseFloat(item.precio.replace("S/", "")), 0);

  // Función para alternar la visibilidad del carrito
  const toggleCarrito = () => {
    setCarritoVisible(!carritoVisible);
  };

  return (
    <div>
      <div className="banner">
        {/* Contenedor de la izquierda: logo */}
        <div className="left-content">
          <div className="logo">Nameless Inc.</div>
        </div>

        {/* Contenedor del cuadro de búsqueda centrado */}
        <div className="center-content">
          <div className="search-bar">
            <input type="text" placeholder="Buscar..." />
            <button className="search-button">
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Contenedor de la derecha: hipervínculos y botón de Sign up */}
        <nav className="right-content">
          <a href="/">Inicio</a>
          <a href="/ofertas">Ofertas</a>
          <button onClick={toggleCarrito}> Mi Carrito
          </button>
          <a href="/login">Login</a>
          <button className="signup-button">Sign up</button>
        </nav>
      </div>

      {/* Ventana desglosable del carrito */}
      {carritoVisible && (
        <div className="carrito-desplegable">
          <div className="carrito-header">
            <h2>Mi Carrito</h2>
            <button className="cerrar-carrito" onClick={toggleCarrito}>
              <FaTimes />
            </button>
          </div>
          <div className="carrito-contenido">
            {carrito.length > 0 ? (
              <ul>
                {carrito.map(item => (
                  <li key={item.id} style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={item.img} alt={item.titulo} style={{ marginRight: '10px', width: '50px', height: '50px' }} />
                    <div>
                      <p>{item.titulo} - {item.precio}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Tu carrito está vacío</p>
            )}
          </div>
          <div className="carrito-footer">
            <p>Total: S/ {totalCarrito.toFixed(2)}</p>
            <button className="comprar-boton">Comprar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Banner;
