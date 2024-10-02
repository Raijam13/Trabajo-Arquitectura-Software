'use client'
import Styles from './page.module.css';
import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'next/image';
import ima from './foto.png'
import React,{ useState} from 'react';

const login = () =>{


    const [correo, setCorreo] = useState('');
    const [contra, setContra] = useState('');

    let email = "";
    let password = 0 ;
 
  
    // Función que maneja el envío del formulario
    const handleButtonClick = (e) => {
      const formData = {
        email: correo,
        password: contra,   
        
      };

      
  
      console.log('Form Data:', formData);
  
      // Aquí puedes hacer algo con los datos, como enviarlos a un servidor o validarlos
    };
    

    return (
        <div className={Styles.render}>
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
            
            <div className={Styles.containerl}>
            
                <div className={Styles.formulario}>
                    <h2>Bienvenido!</h2>
                    <p>Ingresa tus credenciales para iniciar sesión</p>
                  
                    <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Correo</Form.Label>
                        <Form.Control type="email" onChange={e => setCorreo(e.target.value)} />
                        <Form.Text className="text-muted">
                       
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        
                        <Form.Control type="password"  onChange={e => setContra(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Mantener sesión" />
                    </Form.Group>

                    <div className="d-grid gap-2">
                        <Button variant="primary" size="lg" onClick={(handleButtonClick)}>
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
                    >
                        
                    </Image>
            </div>
        

        </div>
        );
    
}

export default login;
   
  
