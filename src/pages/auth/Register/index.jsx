import React, { useState, useRef } from 'react';

//control
import { toast } from 'react-toastify';
import { useForm, FormProvider } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
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

//Owned
import apiAuth from '@/api/tasks/ApiIdentity';
import { Input, Password } from '@/common/control';
//import { CheckBox } from '@/common/global/control/index';

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
        <>
            <Card>
                <CardHeader title="Registro" subheader="Crear tu cuenta ahora" />
                <Divider />
                <CardContent>
                    <p className="text-muted text-sm mb-5">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.
                    </p>

                    <FormProvider {...methods}>
                        <Box component="form" id="registerForm" mt={2} onSubmit={methods.handleSubmit(enviarForm)}>
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
                                    <Input name="phoneNumber" type="number" label="Numero telefonico" />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Input name="userName" label="Usuario" />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Password name="password" type="password" label="Contraseña" />
                                </Grid>
                            </Grid>

                            <Stack direction="column" spacing={2} pt={2}>
                                <LoadingButton type="submit" loading={isLoading} loadingPosition="start" variant="contained" fullWidth>
                                    Registrarse
                                </LoadingButton>
                            </Stack>
                        </Box>
                    </FormProvider>
                </CardContent>
                <Divider />
                <CardContent>
                    <Typography variant="subtitle2" component="span" color="initial">
                        ¿Ya tienes una cuenta? <Link to="/auth">Ingresa</Link>.
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
};

export default Register;
