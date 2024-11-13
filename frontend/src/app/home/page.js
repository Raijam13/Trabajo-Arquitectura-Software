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
                
        </div>
    );
};

export default Home;
