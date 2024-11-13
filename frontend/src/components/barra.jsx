// components/Navbar.js
'use client';
import Form from 'react-bootstrap/Form';
import Link from 'next/link';
import styles from './barra.module.css'; 




const barra = () => {
  return (
    <nav className={styles.navbar}>

      <div className={styles.logo}>
        <Link href="/">MiLogo</Link> {/* Logo o nombre de la web */}
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
         <a href="#" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Primary</a>
      </div>

      
    </nav>
  );
};

export default barra;