'use client'
import { useRouter } from 'next/navigation';
import Styles from './page.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'next/image';
import ima from './foto.png';
import React, { useState } from 'react';
import loginApi from '../../api/login';

const Login = () => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [contra, setContra] = useState('');
    const [error, setError] = useState('');

    const handleButtonClick = async (e) => {
        e.preventDefault();

        const formData = {
            email: email,
            password: contra,   
        };

        console.log('Form Data:', formData);

        const token = await loginApi(email, contra);
        
        if (token) {
            router.push('/frontpage');
        } else {
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
