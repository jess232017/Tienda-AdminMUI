import React from 'react';

//control
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
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
import Typography from '@mui/material/Typography';

//Icons
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

//owned
import useLogin from './useLogin';
import apiAuth from '_@/services/api/tasks/ApiIdentity';
import Input from '_@/common/control/Input';
import { CheckBox } from '_@/common/global/control/index';

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required('El correo es requerido')
        .min(6, 'El correo debe tener al menos 6 caracteres')
        .max(50, 'El correo no debe exceder los 50 caracteres')
        .email('El correo es invalido'),
    password: Yup.string()
        .required('La contraseña es requerida')
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .max(40, 'La contraseña debe exceder los 20 caracteres'),
    remember: Yup.bool().oneOf([true], 'Aceptar guardar la cuenta es requerido')
});

const Login = ({ isExpired = false }) => {
    //Controlar formularios
    const { handleSubmit, formState: { errors }, control, register } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { isLoading, mutateAsync } = apiAuth.SignIn();
    const { handleLogin } = useLogin();

    const enviarForm = (data) => {
        toast.promise(mutateAsync(data), {
            pending: 'Verificando, por favor espere...',
            success: {
                render(data) {
                    return handleLogin(data);
                }
            },
            error: {
                render({ data }) {
                    const error = data?.response?.data?.error;
                    return error?.message || data?.message;
                }
            }
        });
    }

    return (
        <Card>
            <CardHeader
                title="Inicio de sesión"
                subheader="Hola, bienvenido de nuevo! 👋👋"
            />
            <Divider />
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
                    <Stack direction="column" spacing={1} pt={2}>
                        <Input required
                            label="Correo electrónico"
                            name="email"
                            type="text"
                            register={register}
                            error={errors}
                        />

                        <Input required
                            type="password"
                            label="Contraseña"
                            name="password"
                            register={register}
                            error={errors}
                        />

                        <CheckBox
                            name="remember"
                            label="Recordar contraseña"
                            control={control}
                            helperText={errors.remember?.message}
                            error={errors.remember ? true : false}
                        />

                        <LoadingButton
                            type="submit"
                            size="large"
                            loading={isLoading}
                            loadingPosition="start"
                            startIcon={<LoginIcon />}
                            variant="contained"
                            fullWidth
                        >
                            Ingresar
                        </LoadingButton>
                    </Stack>
                </form>
            </CardContent>
            <Divider />
            <CardContent>
                <Typography variant="subtitle2" component="span" color="initial">
                    ¿No tienes una cuenta? <Link to="/auth/sign-up">Registrate</Link>.
                </Typography>
            </CardContent>
        </Card>
    );
}

export default Login;
