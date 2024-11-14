'use client'
import { useRouter } from 'next/navigation'; // Importar el router para redirección
import Styles from './page.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'next/image';
import Header from '../frontpage/components/Header';
import { Carousel } from 'react-responsive-carousel';

import React, { useState } from 'react';


const Servicio = () => {
    const router = useRouter(); // Hook para manejar redirecciones

 

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