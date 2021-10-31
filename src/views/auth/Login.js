import React, {useState, useRef} from 'react';


import Alert from "@material-ui/lab/Alert";
import { Divider } from '@material-ui/core';

import Card from '@material-ui/core/Card';

import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';

import { useSignIn } from 'react-auth-kit';
import { Link, useHistory  } from 'react-router-dom';
import apiAuth from '../../services/api/tasks/ApiService';


const Login = ({isExpired = true}) => {
    const [remember, setRemember] = useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const history = useHistory();
    const signIn = useSignIn();
    const toast = useRef(null);

    const {isLoading, mutate} = apiAuth.ingresar();

    const enviarForm = (e) =>{
        e.preventDefault();
        mutate({email, password},
            {
                onSuccess: ({data : {token, estado: authState}}) => {                    
                    const {exp: expiresIn} = JSON.parse(atob(token.split('.')[1]));
                    const signInConfig = { token, expiresIn, authState, tokenType: "Bearer"};

                    if(signIn(signInConfig)) history.push('/')
                    else toast.current.show({severity:'info', summary: 'Algo salió mal', detail: "No se pudo almacenar el usuario"});
                },
                onError: ({response: {data: {error}}}) => {
                    toast.current.show({severity:'error', summary: 'Algo salió mal', detail: error.mensaje});
                },
            }
        );
    }

    return ( 
        <>
            <Toast ref={toast} />
            <Card>
                <CardHeader
                    title="Inicio de sesión"
                    subheader="Hola, bienvenido de nuevo! 👋👋"
                />
                <Divider/>

                <CardContent>
                    {isExpired ?
                        <Alert variant="outlined" severity="info">
                            Su sesión ha caducado. Inicie sesión de nuevo.
                        </Alert>
                    :
                        <p className="text-muted text-sm mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
                    }
               
                    <form id="loginForm" 
                        className="mt-3"
                        onSubmit={enviarForm}
                    >
                        
                        <Typography variant="h6">Correo electrónico</Typography>
                        <InputText 
                            required
                            value={email}
                            className="mb-3"
                            onChange={(e) => setEmail(e.target.value)} 
                        />

                        <Typography variant="h6">Contraseña</Typography>

                        <Password required  
                            value={password} 
                            feedback = {false}
                            toggleMask = {true}
                            weakLabel = "Débil"
                            mediumLabel = "Medio"
                            strongLabel = "Fuerte"
                            promptLabel="Ingrese su contraseña"
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <div className="p-field-checkbox  mb-3">
                            <Checkbox 
                                checked={remember}
                                onChange={e => setRemember(e.checked)}
                            />
                            <label htmlFor="recordar" className="mt-3 ml-1 text-muted text-sm">
                                Recordar contraseña
                            </label>
                        </div>
                        <Button loading = {isLoading} label="Ingresar"/>
                    </form>
                </CardContent>
                <CardActions>
                    <span className="text-sm text-muted">
                        ¿No tienes una cuenta? <Link to="/sign-up">Registrate</Link>.
                    </span>
                </CardActions>
            </Card>
        </>
    );
}
 
export default Login;