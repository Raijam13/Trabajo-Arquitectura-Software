// components/Navbar.js
'use client';
import Form from 'react-bootstrap/Form';
import Link from 'next/link';
import styles from './barra.module.css'; 
import Button from 'react-bootstrap/Button';
import React from "react";




const barra = () => {

  <link href="https://getbootstrap.com/examples/jumbotron-narrow/jumbotron-narrow.css" rel="stylesheet" />
  

  return (
    <nav className={styles.navbar}>

      <div className={styles.logo}>
        <Link href="/">A tu puerta</Link> {/* Logo o nombre de la web */}
      </div>

      <div className={styles.busqueda}>
      <Form>
         <Form.Group className="mb-3" controlId="formBasicEmail">
      
        <Form.Control type="email" placeholder="¿Qué servicio desea buscar?" />
        <Form.Text className="text-muted">
        </Form.Text>
        </Form.Group>
      </Form>
      </div>
      
      <div className={styles.boton}>
        <button className={styles.button}>
         <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          fill="#ffffff"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        </button> 
      </div>
      <div className={styles.perfil}>
          <p className={styles.p1} >Hola Usuario</p>
          <h4 className={styles.h41}>Cuenta y listas </h4>
      </div>
      <div className={styles.carrito}>

      a
      </div>

      
    </nav>
  );
};

export default barra;