import React from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import './Header.css';

function Banner() {

  return (
    <div>
      <div className="banner">
        {/* Contenedor de la izquierda: logo */}
        <div className="left-content">
          <div className="logo">A Tu Puerta!</div>
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
          <a href="/carrito">Inicio</a>
          <a href="/carrito">Mi Carrito</a>
          <a href="/login">Login</a>
          <button className="signup-button">Sign up</button>
        </nav>
      </div>
    </div>
  );
}

export default Banner;
