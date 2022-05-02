import React from 'react';

//control
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

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

//Owned
import apiAuth from '@/api/tasks/ApiIdentity';
import { Input, Password, CheckBox } from '@/common/control';

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
});

const Register = () => {
    const { isLoading, mutate } = apiAuth.Register();
    //control form
    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const enviarForm = (data) => {
        mutate(data, {
            onSuccess: ({ data }) => {
                methods.reset();
            },
        });
    };

    return (
        <Box width={600}>
            <Card>
                <CustomizedCardHeader
                    title="Registrate"
                    titleTypographyProps={{
                        variant: 'h1',
                        fontSize: '2rem',
                    }}
                    sx={{ pb: 0 }}
                    subheader="Para mantenernos en contacto."
                    avatar={<img src="/img/tienda.png" width={35} />}
                />
                <CardContent sx={{ pt: 2 }}>
                    <FormProvider {...methods}>
                        <Box component="form" id="registerForm" onSubmit={methods.handleSubmit(enviarForm)}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Input name="firstName" label="Nombres" />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Input name="lastName" label="Apellidos" />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Input name="email" label="Correo" />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Input name="phoneNumber" type="number" label="Telefono" />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Input name="userName" autoComplete="new-password" label="Usuario" />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Password name="password" type="password" autoComplete="new-password" label="Contraseña" />
                                </Grid>
                            </Grid>

                            <CheckBox name="remember" label="Estoy de acuerdo con los términos y condiciones" />

                            <Stack direction="column" spacing={2} pt={2}>
                                <LoadingButton type="submit" loading={isLoading} loadingPosition="start" variant="contained" fullWidth>
                                    Registrarse
                                </LoadingButton>
                            </Stack>
                        </Box>
                    </FormProvider>
                    <Divider sx={{ my: 2 }} />{' '}
                    <Typography variant="subtitle2" component={Link} to="/auth" color="initial">
                        Ya tengo una cuenta
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Register;
