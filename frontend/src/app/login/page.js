'use client'
import { useRouter } from 'next/navigation'; // Importar el router para redirección
import Styles from './page.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'next/image';
import ima from './foto.png';
import React, { useState } from 'react';
import loginApi from '../../api/login'; // Importar la función de login

const Login = () => {
    const router = useRouter(); // Hook para manejar redirecciones

    const [email, setEmail] = useState('');
    const [contra, setContra] = useState('');
    const [error, setError] = useState(''); // Estado para manejar el error

    // Función que maneja el envío del formulario
    const handleButtonClick = async (e) => {
        e.preventDefault(); // Evitar que la página se recargue

        const formData = {
            email: email,
            password: contra,   
        };

        console.log('Form Data:', formData);

        // Llamar a la API de inicio de sesión
        const token = await loginApi(email, contra);
        
        if (token) {
            // Si el inicio de sesión es exitoso, redirigir al usuario
            router.push('/frontpage'); // Cambia '/usuario' por la página a la que quieres redirigir
        } else {
            // Si el inicio de sesión falla, mostrar el mensaje de error
            setError('Correo o contraseña inválidos');
        }
    };

    return (
        <div className={Styles.render}>
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet"></link>
            
            <div className={Styles.containerl}>
            
                <div className={Styles.formulario}>
                    <h2>Bienvenido!</h2>
                    <p>Ingresa tus credenciales para iniciar sesión</p>

                    {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostrar error si hay */}

                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Correo</Form.Label>
                            <Form.Control type="email" onChange={e => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" onChange={e => setContra(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Mantener sesión" />
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button variant="primary" size="lg" onClick={handleButtonClick}>
                                Iniciar sesión
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>

            <div className={Styles.containerr}>
                <Image
                    src={ima}
                    style={{
                        maxWidth: '200%',
                        height: 'auto',
                    }}
                />
            </div>
        </div>
    );
};

export default Login;
