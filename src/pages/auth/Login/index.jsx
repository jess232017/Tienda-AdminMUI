import React from 'react';

//control
import { Link } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

//mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

//Icons
import LoginIcon from '@mui/icons-material/Login';

//owned
import useLogin from './useLogin';
import apiAuth from '@/api/tasks/ApiIdentity';
import { Input, Password, CheckBox } from '@/common/control';

const CustomizedCardHeader = styled(CardHeader)`
    flex-direction: row-reverse;
    .MuiCardHeader-avatar {
        margin-right: 0;
    }
    .MuiCardHeader-title {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
    }
`;

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
    remember: Yup.bool().oneOf([true], 'Aceptar guardar la cuenta es requerido'),
});

const Login = ({ isExpired = false }) => {
    //control form
    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { isLoading, mutate } = apiAuth.Authenticate();
    const { handleLogin } = useLogin();

    const enviarForm = (data) => {
        mutate(data, {
            onSuccess: ({ data }) => {
                console.log('data', data);
                handleLogin(data);
            },
        });
    };

    return (
        <Box width={350}>
            <Card>
                <CustomizedCardHeader
                    title="Inicia sesión"
                    titleTypographyProps={{
                        variant: 'h1',
                        fontSize: '2rem',
                    }}
                    sx={{ pb: 0 }}
                    subheader="Para mantenernos en contacto."
                    avatar={
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <img src="/img/tienda.png" width={35} />
                            <Typography variant="caption" color="GrayText">
                                Tienda San Jose
                            </Typography>
                        </Box>
                    }
                />
                <CardContent sx={{ pt: 1 }}>
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(enviarForm)}>
                            <Stack direction="column" spacing={3} pt={2}>
                                <Input required label="Correo electrónico" name="email" type="text" />

                                <Password required type="password" label="Contraseña" name="password" />

                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <CheckBox name="remember" label="Recordarme" />
                                    <Typography
                                        component={Link}
                                        to="/auth/reset-password"
                                        variant="subtitle3"
                                        color="initial"
                                        textAlign="end"
                                    >
                                        ¿Olvido su contraseña?
                                    </Typography>
                                </Box>

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
                    </FormProvider>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle2" component="span" color="initial">
                        <Link to="/auth/sign-up">Crear nueva cuenta</Link>.
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Login;
