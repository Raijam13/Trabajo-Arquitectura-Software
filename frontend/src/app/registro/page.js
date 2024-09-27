'use client'
import Styles from './page.module.css';
import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'next/image';
import ima from './foto.png'
import { useState } from 'react';

const registro = () =>{

    const [isChecked, setIsChecked] = useState(true);

    const handleCheckboxChange = (event) => {
      setIsChecked(false);
    };
  

    return (
        <div className={Styles.render}>
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
            
            <div className={Styles.container}>
            
                <div className={Styles.formulario}>
                    <h2>Unete a nuestra plataforma</h2>
                    
                  
                    <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Correo</Form.Label>
                        <Form.Control type="email"  />
                        <Form.Text className="text-muted">
                       
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Contraseña</Form.Label>
                        
                        <Form.Control type="password"  />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        
                    </Form.Group>

                   
                   


                    <div className={Styles.form2}>
                        <div className={Styles.col}>
                            <div className={Styles.row}>
                            <Form.Group className="mb-3" controlId="formnombres">
                        <Form.Label>Nombres</Form.Label>
                        <Form.Control type="email"  />
                        <Form.Text className="text-muted">
                       
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formtelef">
                        <Form.Label>Telefono</Form.Label>
                        <Form.Control type="email"  />
                        <Form.Text className="text-muted">
                       
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formruc">
                        <Form.Label>RUC</Form.Label>
                        <Form.Control type="email" disabled={isChecked}  />
                        <Form.Text className="text-muted">
                       
                        </Form.Text>
                    </Form.Group>
                            </div>

                        </div>
                        <div className={Styles.col}>
                            <div className={Styles.row}>
                            <Form.Group className="mb-3" controlId="formapellidos">
                        <Form.Label>Apellidos</Form.Label>
                        <Form.Control type="name"  />  
                        <Form.Text className="text-muted">
                       
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formdni">
                        <Form.Label>DNI</Form.Label>
                        <Form.Control type="email"  />
                        <Form.Text className="text-muted">
                       
                        </Form.Text>
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


                    </div>


                    <div className={Styles.boton}>
                        <div className="d-grid gap-2">
                        <Button variant="primary" size="lg">
                            Registrarse
                        </Button>
                        </div>
                    </div>
                    </Form>

                


                    
                </div>
            </div>

           
        

        </div>
        );
    
}

export default registro;
   
  
