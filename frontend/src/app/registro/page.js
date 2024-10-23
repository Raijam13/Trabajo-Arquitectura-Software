'use client'
import { useRouter } from 'next/navigation'; // Importar useRouter para redirección
import Styles from './page.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import regis from '../../api/registro';

const Registro = () => {
    const router = useRouter(); // Hook para manejar la navegación

    const [isChecked, setIsChecked] = useState(true);

    // Estados para todos los campos del formulario
    const [email, setCorreo] = useState(''); // Correo electrónico
    const [name, setName] = useState(''); // Nombres
    const [contra, setContra] = useState(''); // Contraseña
    const [telf, setTelf] = useState(''); // Teléfono
    const [ruc, setRuc] = useState('');
    const [apell, setApell] = useState(''); // Apellidos
    const [edad, setEdad] = useState(''); // Edad
    const [dni, setDni] = useState(''); // DNI

    const handleCheckboxChange = (event) => {
        setIsChecked(!isChecked);
    };

    // Función para manejar el registro
    const handleRegister = () => {
        const nombreCompleto = `${name} ${apell}`; // Unir nombre y apellido

        console.log({
            name,
            apell,
            email, 
            contra, 
            edad, 
            dni, 
            telf, 
            nombreCompleto
        }); // Verificar que los valores sean correctos

        regis(name, apell, email, contra, edad, dni, telf, nombreCompleto) // Pasar los valores correctamente
            .then(() => {
                alert('Registro exitoso');
                router.push('/login'); // Redirigir a la página de login después del registro
            })
            .catch((error) => {
                console.error('Error en el registro:', error);
                alert('Error en el registro: ' + error.message);
            });
    };

    return (
        <div className={Styles.render}>
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet"></link>
            
            <div className={Styles.container}>
            <br></br>
                <div className={Styles.formulario}>
                <br></br>
                <br></br>
                <br></br>
                    <h2>Únete a nuestra plataforma</h2>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Correo</Form.Label>
                            <Form.Control type="email" onChange={e => setCorreo(e.target.value)} /> {/* Correo */}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" onChange={e => setContra(e.target.value)} /> {/* Contraseña */}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEdad">
                            <Form.Label>Edad</Form.Label>
                            <Form.Control type="number" onChange={e => setEdad(e.target.value)} /> {/* Edad */}
                        </Form.Group>

                        <div className={Styles.form2}>
                            <div className={Styles.col}>
                                <Form.Group className="mb-3" controlId="formnombres">
                                    <Form.Label>Nombres</Form.Label>
                                    <Form.Control type="text" onChange={e => setName(e.target.value)} /> {/* Nombres */}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formtelef">
                                    <Form.Label>Teléfono</Form.Label>
                                    <Form.Control type="text" onChange={e => setTelf(e.target.value)} /> {/* Teléfono */}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formruc">
                                    <Form.Label>RUC</Form.Label>
                                    <Form.Control type="text" disabled={isChecked} onChange={e => setRuc(e.target.value)} />
                                </Form.Group>
                            </div>

                            <div className={Styles.col}>
                                <Form.Group className="mb-3" controlId="formapellidos">
                                    <Form.Label>Apellidos</Form.Label>
                                    <Form.Control type="text" onChange={e => setApell(e.target.value)} /> {/* Apellidos */}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formdni">
                                    <Form.Label>DNI</Form.Label>
                                    <Form.Control type="text" onChange={e => setDni(e.target.value)} /> {/* DNI */}
                                </Form.Group>

                                <div className="container mt-4">
                                    <Form.Check 
                                        type="checkbox" 
                                        label="Quiero ser Proveedor"
                                        onChange={handleCheckboxChange} 
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={Styles.boton}>
                            <div className="d-grid gap-2">
                                <Button variant="primary" size="lg" onClick={handleRegister}>
                                    Registrarse
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Registro;
