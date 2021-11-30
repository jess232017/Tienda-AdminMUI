import React from 'react';

//control
import { useSnackbar } from 'notistack';
import { useForm } from "react-hook-form";
import { useSignIn } from 'react-auth-kit';
import { Link, useHistory  } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

//mui
import Alert from '@mui/lab/Alert'
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import LoadingButton from '@mui/lab/LoadingButton';

//owned
import apiAuth from 'src/services/api/tasks/ApiService';
import {Input, CheckBox} from 'src/common/global/control/index';

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required('El correo es requerido')
        .min(6, 'El correo debe tener al menos 6 caracteres')
        .max(20, 'El correo no debe exceder los 20 caracteres')
        .email('El correo es invalido'),
    password: Yup.string()
        .required('La contraseña es requerida')
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .max(40, 'La contraseña debe exceder los 20 caracteres'),
    remember: Yup.bool().oneOf([true], 'Aceptar guardar la cuenta es requerido')
});

const Login = ({isExpired = true}) => {
    //Controlar formularios
    const { handleSubmit, formState: { errors }, control } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const {isLoading, mutate} = apiAuth.ingresar();
    const { enqueueSnackbar } = useSnackbar();

    const history = useHistory();
    const signIn = useSignIn();

    const enviarForm = (data) =>{

        mutate(data, {
            onSuccess: ({data : {token, estado: authState}}) => {                    
                const {exp} = JSON.parse(atob(token.split('.')[1]));

                //calcular los minutos que faltan para que caduque el token
                const today = new Date();
                const expire = new Date(exp * 1000);
                const diffMs = (expire - today); 
                const diffDays = Math.floor(diffMs / 86400000) * 24 * 60;
                const diffHrs = Math.floor((diffMs % 86400000) / 3600000) * 60; 
                const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); 

                const expiresIn = diffDays + diffHrs + diffMins;
                const signInConfig = { token, expiresIn, authState, tokenType: "Bearer"};

                if(signIn(signInConfig)) history.push('/')
                else enqueueSnackbar('Algo salió mal', { 
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                });
            },
            onError: ({response: {data: {error}}}) => {
                enqueueSnackbar('Algo salió mal',  { 
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                });

                //toast.current.show({severity:'error', summary: '', detail: error.mensaje});
            },
        });
    }

    return ( 
        <Card>
            <CardHeader
                title="Inicio de sesión"
                subheader="Hola, bienvenido de nuevo! 👋👋"
            />
            <Divider/>
            <CardContent>
                {isExpired ?
                    <Alert variant="filled" severity="warning">
                        Su sesión ha caducado. Inicie sesión de nuevo.
                    </Alert>
                :
                    <p className="text-muted text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
                }
            
                <form 
                    className="mt-3"
                    onSubmit={handleSubmit(enviarForm)}
                >
                    <Stack direction="column" spacing={2} pt={2}>
                        <Input
                            name="email"
                            label="Correo electrónico"
                            control = {control}
                            helperText={errors.email?.message}
                            error={errors.email ? true : false}
                        />

                        <Input
                            type="password"
                            name="password"
                            label="Contraseña"
                            control = {control}
                            helperText={errors.password?.message}
                            error={errors.password ? true : false}
                        />

                        <CheckBox
                            name="remember"
                            label="Recordar contraseña"
                            control = {control}
                            helperText={errors.remember?.message}
                            error={errors.remember ? true : false}
                        />
                        <LoadingButton
                            type="submit"
                            size="large"
                            loading= {isLoading}
                            loadingPosition="start"
                            variant="contained"
                            fullWidth
                        >
                            Ingresar
                        </LoadingButton>
                    </Stack>
                </form>
            </CardContent>
            <Divider/>
            <CardContent>
                <span className="text-sm text-muted">
                    ¿No tienes una cuenta? <Link to="/auth/sign-up">Registrate</Link>.
                </span>
            </CardContent>
        </Card>
    );
}
 
export default Login;
