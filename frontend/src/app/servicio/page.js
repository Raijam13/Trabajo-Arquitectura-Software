'use client'
import { useRouter } from 'next/navigation'; // Importar el router para redirección
import Styles from './page.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import Image from 'next/image';
import Header from '../frontpage/components/Header';
import clock from '../../icons/clock.png'
import calendar from '../../icons/calendar.png'
import location from '../../icons/location.png'
import { useState, useEffect } from 'react';

const Servicio = () => {

    const router = useRouter(); // Hook para manejar redirecciones

    const [Servicio,SetServicio] = useState({
      Titulo: "",
      servicio_Descripcion: "",
      CostoPromedio: 0,
    });


    return (
        <div className={Styles.render}>
             
             <div className={Styles.barra}>
                   <Header/>
             </div>
            <div className={Styles.page}>
                <div className={Styles.container1}>

                    <div className={Styles.s1}>

                    </div>
                    <div className={Styles.s2}>
                        <div className={Styles.titulo}  >
                            <h1>Titulo Servicio</h1>
                            <a href=''> usuario 1</a> 
                        </div>

                        <div className={Styles.precio}>
                             <h2> Costo  x hora promedio</h2>
                            <div className={Styles.preciob}>
                                
                                <h3>S./30.00</h3>
                            </div>
                        </div>

                        <hr className={Styles['divisor']}></hr>

                        <div className={Styles.agendar}>
                                <div className={Styles.botones}>

                                  <button className={Styles.btn}>
                                  <Image
                                      src={clock}
                                      width={32}
                                      height={32}
                                      alt="Picture of the author"
                                    />
                                    <p>Hora</p>
                                  </button>
                                    
                                  <button className={Styles.btn}>
                                  <Image
                                      src={calendar}
                                      width={32}
                                      height={32}
                                      alt="Picture of the author"
                                    />
                                    <p>Día</p>
                                  </button>
                                  <button className={Styles.btn}>
                                  <Image
                                      src={location}
                                      width={32}
                                      height={32}
                                      alt="Picture of the author"
                                    />
                                    <p>Ubicación</p>
                                  </button>
                                  
                                </div>
                                <div className={Styles.compra}>
                                    <button className={Styles.comprar}> <h5>Añadir al Carro</h5></button>
                                </div>
                        </div>

                        <hr className={Styles['divisor']}></hr>

                        <div className={Styles.desc}>
                              <h5>Descripción</h5>
                              <p>lorem lorem ipsis   dsadsadsaasasda   </p>
                        </div>
                    </div>

                </div>  
                
                <div className={Styles.container2}>

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

export default Servicio;