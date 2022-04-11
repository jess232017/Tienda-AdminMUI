import React, { useState, useRef } from 'react';

//control
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
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
import apiAuth from '_@/api/tasks/ApiIdentity';
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
});

const Register = () => {
    const { isLoading, mutateAsync } = apiAuth.Register();
    //control form
    const {
        handleSubmit,
        formState: { errors },
        register,
        control,
        reset,
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const enviarForm = (data) => {
        toast.promise(mutateAsync(data), {
            pending: 'Verificando, por favor espere...',
            success: {
                render() {
                    reset();
                    return 'Usuario registrado correctamente';
                },
            },
            error: {
                render(info) {
                    console.log('data', JSON.stringify(info), info);
                    const data = info.data;
                    const error = data?.response?.data?.error;
                    const errors = JSON.stringify(data?.response?.data?.errors);
                    return error?.message || errors;
                },
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

                    <Box component="form" id="registerForm" mt={2} onSubmit={handleSubmit(enviarForm)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Input name="firstName" label="Nombres" register={register} error={errors} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Input name="lastName" label="Apellidos" register={register} error={errors} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Input name="email" label="Correo" register={register} error={errors} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Input name="phoneNumber" type="number" label="Numero telefonico" register={register} error={errors} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Input name="userName" label="Usuario" register={register} error={errors} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Input name="password" type="password" label="Contraseña" register={register} error={errors} />
                            </Grid>
                        </Grid>

                        <Stack direction="column" spacing={2} pt={2}>
                            <LoadingButton type="submit" loading={isLoading} loadingPosition="start" variant="contained" fullWidth>
                                Registrarse
                            </LoadingButton>
                        </Stack>
                    </Box>
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
