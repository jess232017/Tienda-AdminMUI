import React, {useState, useRef} from 'react';

import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';

import { useSignIn } from 'react-auth-kit';
import { Link, useHistory  } from 'react-router-dom';
import apiAuth from '../../services/api/tasks/ApiService';


const Login = () => {
    const [remember, setRemember] = useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const history = useHistory();
    const signIn = useSignIn();
    const toast = useRef(null);

    const {isLoading, mutate} = apiAuth.ingresar();

    const enviarForm = async(e) =>{
        e.preventDefault();
        const values = {email, password}
        mutate(
            values,
            {
                onSuccess: ({data : {token, estado: authState}}) => {                    
                    const {exp: expiresIn} = JSON.parse(atob(token.split('.')[1]));
                    const signInConfig = { token, expiresIn, authState, tokenType: "Bearer"};

                    if(signIn(signInConfig)) history.push('/')
                    else toast.current.show({severity:'info', summary: 'Algo salió mal', detail: "No se pudo almacenar el usuario"});
                },
                onError: ({response: {data: {error}}}) => {
                    toast.current.show({severity:'error', summary: 'Algo salió mal', detail: error.mensaje});
                }
            }
        );
    }

    return ( 
        <>
            <Toast ref={toast} />
            <Card title="Inicio de sesión" 
                subTitle="Hola, bienvenido de nuevo! 👋👋" 
                footer = {
                    <div className="text-sm text-muted">
                        ¿No tienes una cuenta? <Link to="/sign-up">Registrate</Link>.
                    </div>
                }
            >
                <p className="text-muted text-sm mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
                <form id="loginForm" onSubmit={enviarForm}>
                    
                    <h6>Dirección de correo electrónico</h6>
                    <InputText required value={email} onChange={(e) => setEmail(e.target.value)} />

                    <h6 className="mt-4">Contraseña</h6>
                    <Password required value={password} onChange={(e) => setPassword(e.target.value)} 
                            promptLabel="Ingrese su contraseña"
                            weakLabel = "Débil"
                            mediumLabel = "Medio"
                            strongLabel = "Fuerte"
                            feedback = {false}
                            toggleMask = {true}/>

                    <div className="p-field-checkbox mt-1">
                        <Checkbox inputId="recordar" checked={remember} onChange={e => setRemember(e.checked)}></Checkbox>
                        <label htmlFor="recordar" className="mt-1 ml-1 text-muted text-sm">Recordar contraseña</label>
                    </div>
                    <Button loading = {isLoading} label="Ingresar"/>
                </form>
            </Card>
        </>
    );
}
 
export default Login;