'use client';
import Styles from './page.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect, useState } from 'react';
import { getPropuestas, eliminarPropuesta } from '../../api/carrito'; // Importamos las funciones de la API

const Cart = () => {
  const [propuestas, setPropuestas] = useState([]);
  const [nombreCliente, setNombreCliente] = useState(''); // Inicializamos el nombre como vacío
  const [subtotal, setSubtotal] = useState(0);

  // Calcular el subtotal de las propuestas
  const calcularSubtotal = (items) => {
    const total = items.reduce((acc, item) => acc + item.costo_promedio, 0);
    setSubtotal(total);
  };

  // Cargar las propuestas y el nombre del cliente desde la API al montar el componente
  useEffect(() => {
    const cargarDatos = async () => {
      // Obtenemos las propuestas
      const propuestasCargadas = await getPropuestas();
      setPropuestas(propuestasCargadas);
      calcularSubtotal(propuestasCargadas);

      // Aquí hacemos una llamada al backend para obtener el nombre del cliente autenticado
      const response = await fetch('http://localhost:3009/users/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Asegúrate de enviar el token
        },
      });
      const cliente = await response.json();
      setNombreCliente(cliente.nombre_completo); // Suponiendo que la API devuelve un objeto con el nombre completo
    };

    cargarDatos();
  }, []);

  // Manejar la eliminación de una propuesta del carrito y en la base de datos
  const handleEliminarPropuesta = async (id) => {
    await eliminarPropuesta(id); // Esto eliminará la propuesta de la BD
    setPropuestas(propuestas.filter((propuesta) => propuesta._id !== id)); // Actualizamos el estado
  };

  // Función para mostrar un pop-up de confirmación
  const handleConfirmarPedido = () => {
    alert('¡Pago confirmado!'); // Popup simple para confirmar el pedido
  };

  return (
    <div className={Styles.container}>
      <nav className={Styles.navbar}>
        <span className={Styles.nombreCliente}>{nombreCliente}</span>
        <a href="/inicio" className={Styles.link}>Inicio</a>
        <a href="/ofertas" className={Styles.link}>Ofertas</a>
        <a href="/carrito" className={Styles.link}>Mi Carrito</a>
      </nav>
      
      <div className={Styles.listaDePropuestas}>
        <h2>Lista de Propuestas Seleccionadas</h2>
        <ListGroup>
          {propuestas.map((propuesta) => (
            <ListGroup.Item key={propuesta._id}>
              <div className={Styles.propuesta}>
                <h5>{propuesta.titulo}</h5>
                <p>Tipo: {propuesta.tipo}</p>
                <p>{propuesta.servicio_description}</p>
                <p>Descripción del costo: {propuesta.costo_descripción}</p>
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
      </div>

      <div className={Styles.detallesDeCompra}>
        <h3>Detalles del Pedido</h3>
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <h4>Total: ${subtotal.toFixed(2)}</h4>
        <Button className={Styles.btnConfirm} size="lg" onClick={handleConfirmarPedido}>
          Confirmar Pago
        </Button>
      </div>
    </div>
  );
};

export default Cart;
