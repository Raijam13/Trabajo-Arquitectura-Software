'use client'
import Styles from './page.module.css';
import "@nextui-org/react/styles.css";
import {Input} from "@nextui-org/react";


const login = () =>{
    return (
        <div className={Styles.render}>
            
            <div className={Styles.containerl}>
            
                <div className={Styles.formulario}>
                    <h2>Bienvenido!</h2>
                    <p>Ingresa tus credenciales para iniciar sesión</p>

                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <Input type="email" label="Email" />
                     <Input type="email" label="Email" placeholder="Enter your email" />
                        </div>
                </div>
            </div>

            <div className={Styles.containerr}>
                    d
            </div>
        

        </div>
        );
    
}

export default login;
   
  
