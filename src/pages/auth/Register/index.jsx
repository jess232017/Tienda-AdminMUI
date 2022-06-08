import React from 'react';

//control
import { useNavigate } from 'react-router-dom';
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

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';

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
    firstName: Yup.string()
        .required('El nombre es requerido')
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(30, 'El nombre no debe exceder los 30 caracteres'),
    lastName: Yup.string()
        .required('El apellido es requerido')
        .min(3, 'El apellido debe tener al menos 3 caracteres')
        .max(30, 'El apellido no debe exceder los 30 caracteres'),
    userName: Yup.string()
        .required('El usuario es requerido')
        .min(4, 'El usuario debe tener al menos 4 caracteres')
        .max(30, 'El usuario no debe exceder los 20 caracteres'),
    phoneNumber: Yup.number()
        .typeError('El telefono deber ser de tipo numero')
        .required('El telefono es requerido')
        .test('len', 'El telefono debe tener exactamente 8 caracteres', (val) => val.toString().length === 8),
    email: Yup.string().required('El correo es requerido').email('Debe ser un correo valido'),
    password: Yup.string()
        .required('La contraseña es requeridad')
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .max(16, 'La contraseña no debe exceder los 16 caracteres')
        .matches(
            /^.*(?=.{8,16})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            'La contraseña debe tener al menos una mayuscula, un numero y un caracter especial (!?$*.).'
        ),
});

const Register = () => {
    const navigate = useNavigate();
    const { isLoading, mutate } = apiAuth.Register();
    //control form
    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const enviarForm = (data) => {
        mutate(data, {
            onSuccess: ({ data }) => {
                methods.reset();
                navigate('/');
            },
        });
    };

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box width={500}>
            <Card>
                <CustomizedCardHeader
                    title="Registrate"
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
                <CardContent sx={{ pt: 2 }}>
                    <FormProvider {...methods}>
                        <Box component="form" id="registerForm" onSubmit={methods.handleSubmit(enviarForm)}>
                            <Stepper activeStep={activeStep} orientation="vertical">
                                <Step>
                                    <StepLabel>Datos Personales</StepLabel>
                                    <StepContent>
                                        <Stack mt={2}>
                                            <Input name="firstName" label="Nombres*" />
                                            <Input name="lastName" label="Apellidos*" />
                                        </Stack>
                                        <Box sx={{ mb: 2 }}>
                                            <div>
                                                <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                                                    Continuar
                                                </Button>
                                                <Button disabled onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                                                    Volver
                                                </Button>
                                            </div>
                                        </Box>
                                    </StepContent>
                                </Step>
                                <Step>
                                    <StepLabel optional={<Typography variant="caption">Último paso</Typography>}>Cuenta</StepLabel>
                                    <StepContent>
                                        <Grid container spacing={2}>
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
                                        <Box sx={{ mb: 2 }}>
                                            <div>
                                                <LoadingButton
                                                    sx={{ mt: 1, mr: 1 }}
                                                    type="submit"
                                                    loading={isLoading}
                                                    loadingPosition="start"
                                                    variant="contained"
                                                >
                                                    Finalizar
                                                </LoadingButton>
                                                <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                                                    Volver
                                                </Button>
                                            </div>
                                        </Box>
                                    </StepContent>
                                </Step>
                            </Stepper>
                        </Box>
                    </FormProvider>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle2" component="span" color="initial">
                        <Link to="/auth">Ya tengo una cuenta</Link>.
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Register;
