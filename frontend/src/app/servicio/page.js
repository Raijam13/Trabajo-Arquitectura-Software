'use client';
import { useRouter } from 'next/navigation';
import Styles from './page.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import Header from '../frontpage/components/Header';
import { FiClock, FiCalendar, FiMapPin } from 'react-icons/fi';
import { useState } from 'react';

const Servicio = () => {
  const router = useRouter();

  // Objeto estático de ejemplo para el servicio
  const servicioEjemplo = {
    id: 1,
    titulo: "Limpieza de Casa",
    usuario: "María García",
    costoPromedio: "S/. 30.00",
    descripcion: "Servicio completo de limpieza para hogares, incluye cocina, sala y baños.",
    imagen: "https://via.placeholder.com/500x500",
  };

  const comentariosEjemplo = [
    {
      id: 1,
      usuario: "Sofía Dasila",
      comentario: "Buena relación entre precio y calidad en el servicio. Además, se deja regatear jjjssjss.",
      calificacion: 3,
    },
    {
      id: 2,
      usuario: "Carlos Ruiz",
      comentario: "Excelente trabajo, muy detallista y puntual. ¡Recomendado!",
      calificacion: 5,
    },
  ];

  const [nuevoComentario, setNuevoComentario] = useState("");


  // Calcular el promedio de estrellas
  const calcularPromedioEstrellas = (comentarios) => {
    if (comentarios.length === 0) return 0;
    const totalEstrellas = comentarios.reduce((sum, comentario) => sum + comentario.calificacion, 0);
    return (totalEstrellas / comentarios.length).toFixed(1);
  };

  const promedioEstrellas = calcularPromedioEstrellas(comentariosEjemplo);
  const totalComentarios = comentariosEjemplo.length;

  // Renderizar estrellas basadas en la calificación
  const renderStars = (calificacion) => {
    const maxStars = 5;
    return (
      <>
        {Array.from({ length: maxStars }).map((_, index) => (
          <span key={index} style={{ color: index < calificacion ? "#ffc107" : "#e4e5e9" }}>★</span>
        ))}
      </>
    );
  };

  return (
    <div className={Styles.render1}>
      {/* Header */}
      <div className={Styles.barra}>
        <Header />
      </div>

      {/* Contenedor dividido en 50% y 50% */}
      <div className={Styles.page}>
        {/* Primera sección: Imagen */}
        <div className={Styles.imagenContainer}>
          <img src={servicioEjemplo.imagen} alt={servicioEjemplo.titulo} className={Styles.imagen} />
        </div>

        {/* Segunda sección: Contenido actual */}
        <div className={Styles.contenido}>
          <div className={Styles.titulo}>
            <h1>{servicioEjemplo.titulo}</h1>
            <p>
              De: <a href='#'>{servicioEjemplo.usuario}</a>
              &nbsp;
              <span className={Styles.estrellas}>{renderStars(Math.round(promedioEstrellas))}</span>
              &nbsp;
               <span>({totalComentarios})</span>
            </p>
          </div>

          <div className={Styles.precioContainer}>
            <div className={Styles.preciob}>
              <span className={Styles.simbolo}>S/.</span>
              <span className={Styles.cantidad}>30.00</span>
            </div>
            <span className={Styles.costoDescripcion}>Costo x hora promedio</span>
          </div>

          <div className={Styles.desc}>
            <p>{servicioEjemplo.descripcion}</p>
          </div>

          <hr className={Styles.divisor} />

          {/* Botones de agendar */}
          <div className={Styles.agendar}>
            <button className={Styles.btn}><FiClock size={24} /><p>Hora</p></button>
            <button className={Styles.btn}><FiCalendar size={24} /><p>Día</p></button>
            <button className={Styles.btn}><FiMapPin size={24} /><p>Lugar</p></button>
            <button className={Styles.comprar}>Añadir al Carro</button>
          </div>

          <hr className={Styles.divisor} />

          {/* Comentarios */}
          <h4>Comentarios</h4>
          {comentariosEjemplo.map((comentario, index) => (
            <div key={index} className={Styles.comentario}>
              <div className={Styles.comentarioHeader}>
                <h5>{comentario.usuario}</h5>
                <div>{renderStars(comentario.calificacion)}</div>
              </div>
              <p>{comentario.comentario}</p>
            </div>
          ))}

          {/* Caja para nuevo comentario */}
          <div className={Styles.nuevoComentario}>
            <h5>Deja tu comentario</h5>
            <div className={Styles.comentarioInput}>
              <textarea
                value={nuevoComentario}
                onChange={(e) => setNuevoComentario(e.target.value)}
                placeholder="Escribe aquí tu comentario..."
                className={Styles.textarea}
              />
              <button className={Styles.enviarBtn}>Enviar</button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`${Styles.render0} ${Styles['lower-banner']}`}>
        <div className={Styles.links}>
          <a href="#">Trabaja con nosotros</a>
          <a href="#">Términos y condiciones</a>
          <a href="#">Cómo cuidamos tu privacidad</a>
          <a href="#">Accesibilidad</a>
          <a href="#">Ayuda</a>
        </div>
        <p>© 2024 A Tu Puerta. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Servicio;
