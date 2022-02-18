import React, { useState, useRef } from 'react';

import { useForm } from "react-hook-form";
import { useSignIn } from 'react-auth-kit';
import { Link, useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';

import { Toast } from 'primereact/toast';

//Owned
import apiAuth from '_@/services/api/tasks/ApiService';
import { Input, CheckBox } from '_@/common/global/control/index';

const Register = () => {
    const { isLoading, mutate } = apiAuth.ingresar();
    const [remember, setRemember] = useState(false);
    const [password, setPassword] = useState("");
    const [agree, setAgree] = useState(false);
    const [email, setEmail] = useState("");
    const [user, setUser] = useState("");
    const navigate = useNavigate();
    const signIn = useSignIn();
    const toast = useRef(null);

    const { handleSubmit, reset, control } = useForm();

    const enviarForm = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <Toast ref={toast} />
            <Card>
                <CardHeader
                    title="Registro"
                    subheader="Crear tu cuenta ahora"
                />
                <Divider />
                <CardContent>
                    <p className="text-muted text-sm mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>

                    <form id="registerForm"
                        className="mt-3"
                        onSubmit={enviarForm}
                    >
                        <Stack direction="column" spacing={2} pt={2}>
                            <Input
                                name="userName"
                                label="Nombre de Usuario"
                                control={control}
                            />

                            <Input
                                name="email"
                                label="Correo electrónico"
                                control={control}
                            />

                            <Input
                                type="password"
                                name="password"
                                label="Contraseña"
                                control={control}
                            />


                            <CheckBox
                                name="recordar"
                                label="Recordar contraseña"
                                control={control}
                            />

                            <LoadingButton
                                type="submit"
                                loading={isLoading}
                                loadingPosition="start"
                                variant="contained"
                                fullWidth
                            >
                                Registrarse
                            </LoadingButton>
                        </Stack>
                    </form>
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
}

export default Register;
