"use client";

import Styles from './page.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from 'react';
import { eliminarPropuesta, getServiciosEnCarrito, pagarCarrito } from '../../api/carrito'; 

const Cart = () => {
  const [propuestas, setPropuestas] = useState([]);
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [subtotal, setSubtotal] = useState(0);

  const calcularSubtotal = (items) => {
    const total = items.reduce((acc, item) => acc + item.costo_promedio, 0);
    setSubtotal(total);
  };

  useEffect(() => {
    const cargarDatos = async () => {
      const propuestasCargadas = await getServiciosEnCarrito();
      setPropuestas(propuestasCargadas);
      calcularSubtotal(propuestasCargadas);

      const response = await fetch('http://localhost:3009/users/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, 
        },
      });
      const usuario = await response.json();
      setNombreUsuario(usuario.nombre_completo);
    };

    cargarDatos();
  }, []);

  const handleEliminarPropuesta = async (id) => {
    const success = await eliminarPropuesta(id);
  
    if (success) {
      setPropuestas(propuestas.filter((propuesta) => propuesta._id !== id));
    } else {
      console.error('No se pudo eliminar la propuesta');
    }
  };

  const handleConfirmarPedido = async () => {
    try {
        const serviceId = propuestas.length > 0 ? propuestas[0]._id : null; // Ejemplo de cómo obtener un serviceId
        if (!serviceId) {
            alert('No hay servicios en el carrito.');
            return;
        }

        const success = await pagarCarrito(serviceId);
        if (success) {
            alert('¡Pago confirmado! El trabajo ahora está en proceso.');
            setPropuestas([]);
            window.location.href = '/frontpage';
        } else {
            alert('Error al confirmar el pago.');
        }
    } catch (error) {
        console.error('Error al confirmar el pago:', error);
        alert('Ocurrió un error al confirmar el pago.');
    }
};

  return (
    <div className={Styles.container}>
      <nav className={Styles.navbar}>
        <span className={Styles.nombreUsuario}>{nombreUsuario}</span>
        <a href="/perfil" className={Styles.link}>Mi perfil</a>
        <a href="/frontpage" className={Styles.link}>Inicio</a>
        <a href="/misTrabajos" className={Styles.link}>Mis Trabajos</a>
        <a href="/carrito" className={Styles.link}>Mi Carrito</a>
      </nav>
      
      <div className={Styles.listaDePropuestas}>
        <h2>Lista de Propuestas Seleccionadas</h2>
        {propuestas.length === 0 ? (
          <p className={Styles.mensajeVacio}>No hay items en el carrito.</p>
        ) : (
          <ListGroup>
            {propuestas.map((propuesta) => (
              <ListGroup.Item key={propuesta._id}>
                <div className={Styles.propuesta}>
                  <h5>{propuesta.titulo}</h5>
                  <p>Tipo: {propuesta.tipo}</p>
                  <p>{propuesta.servicio_description}</p>
                  <p>Descripción del costo: {propuesta.costo_descripción}</p>
                  <p>Vendedor: {propuesta.vendedor ? propuesta.vendedor.usuario : 'No disponible'}</p>
                  <span>${propuesta.costo_promedio.toFixed(2)}</span>
                  <Button className={Styles.btnEliminar} onClick={() => handleEliminarPropuesta(propuesta._id)}>
                    Eliminar
                  </Button>
                </div>
                {propuesta.id_foto && propuesta.id_foto.length > 0 && (
                  <div className={Styles.fotos}>
                    {propuesta.id_foto.map((foto) => (
                      <img key={foto} src={`http://localhost:3009/uploads/${foto}`} alt="Foto del servicio" />
                    ))}
                  </div>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </div>

      {propuestas.length > 0 && (
        <div className={Styles.detallesDeCompra}>
          <h3>Detalles del Pedido</h3>
          <p>Subtotal: ${subtotal.toFixed(2)}</p>
          <h4>Total: ${subtotal.toFixed(2)}</h4>
          <Button className={Styles.btnConfirm} size="lg" onClick={handleConfirmarPedido}>
            Confirmar Pago
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;