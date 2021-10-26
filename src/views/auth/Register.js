import React, {useState} from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import {Checkbox} from 'primereact/checkbox';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';

import { Link } from "react-router-dom";

const Register = () => {
    const [password, setPassword] = useState("");
    const [agree, setAgree] = useState(false);
    const [email, setEmail] = useState("");
    const [user, setUser] = useState("");

    const enviarForm = (e) =>{
        e.preventDefault();
        const data = {
            Email : email,
            Password : password
        }

        console.log("enviando: ", data);
    }

    return (  
        <Card title="Registro" subTitle="Crear tu cuenta ahora" footer = {
            <div className="text-sm text-muted">
                ¿Ya tienes una cuenta? <Link to="/login">Ingresa</Link>.
            </div>
        }>

            <p className="text-muted text-sm mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
            <form id="loginForm" onSubmit={enviarForm}>
                
                <h6>Nombre de Usuario</h6>
                <InputText required value={user} onChange={(e) => setUser(e.target.value)} />

                <h6 className="mt-4">Dirección de correo electrónico</h6>
                <InputText required value={email} onChange={(e) => setEmail(e.target.value)} />

                <h6 className="mt-4">Contraseña</h6>
                <Password required value={password} onChange={(e) => setPassword(e.target.value)} 
                        promptLabel="Ingrese su contraseña"
                        weakLabel = "Débil"
                        mediumLabel = "Medio"
                        strongLabel = "Fuerte"
                        toggleMask = {true}/>

                <div className="p-field-checkbox mt-1">
                    <Checkbox inputId="recordar" checked={agree} onChange={e => setAgree(e.checked)}></Checkbox>
                    <label htmlFor="recordar" className="mt-1 ml-1 text-muted text-sm">
                        Estoy de acuerdo con los <Link to="/policy">Terminos y Condiciones</Link>.
                    </label>
                </div>
                <Button label="Registrarse"/>
            </form>
            
        </Card>
    );
}
 
export default Register;
