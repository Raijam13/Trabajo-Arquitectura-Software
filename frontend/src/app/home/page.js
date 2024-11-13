'use client'
import { useRouter } from 'next/navigation'; // Importar el router para redirección
import Styles from './page.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'next/image';
// import ima from './foto.png';
import React, { useState } from 'react';
import loginApi from '../../api/login'; // Importar la función de login

import Barra from '../../components/barra.jsx'

const Home = () => {
    const router = useRouter(); // Hook para manejar redirecciones


    // Función que maneja el envío del formulario
 

    return (
        <div className={Styles.render}>
           
             <Barra></Barra>
           
            <div className={Styles.page}>
                <div className={Styles.fltro}>
                    <h4>Filtrar busqueda</h4>
                </div>
                <div className={Styles.resultados}>

                </div>
                <div className={Styles.descrip}>

                </div>
            </div>
                
        </div>
    );
};

export default Home;
