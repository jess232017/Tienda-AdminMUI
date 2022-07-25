import React from 'react'

//control
//import OtpInput from 'react-otp-input';
import { useForm, FormProvider } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import CardContent from '@mui/material/CardContent'
import LoadingButton from '@mui/lab/LoadingButton'
import Typography from '@mui/material/Typography'

//Owned
import apiAuth from '@/api/tasks/ApiIdentity'
import { Input } from '@/common/control'

const validationSchema = Yup.object().shape({
    otp: Yup.string().required('El correo es requerido').min(6, 'El correo debe tener al menos 6 caracteres'),
})

const Register = () => {
    const { isLoading, mutate } = apiAuth.Register()

    //control form
    const methods = useForm({
        resolver: yupResolver(validationSchema),
    })

    const enviarForm = (data) => {
        /* mutate(data, {
            onSuccess: ({ data }) => {
                methods.reset();
            },
        });*/
    }

    return (
        <Box width={380}>
            <Card>
                <CardContent sx={{ p: 6 }}>
                    <FormProvider {...methods}>
                        <Stack
                            spacing={2}
                            component='form'
                            id='registerForm'
                            onSubmit={methods.handleSubmit(enviarForm)}>
                            <Stack spacing={2} alignItems='center'>
                                <Box display='flex' flexDirection='column' alignItems='center'>
                                    <img src='/img/tienda.png' width={55} />
                                    <Typography variant='caption' color='GrayText'>
                                        Tienda San Jose
                                    </Typography>
                                </Box>

                                <Typography variant='h4' textAlign='center'>
                                    Mantengamos tu cuenta segura
                                </Typography>
                            </Stack>
                            <div>
                                {/*<OtpInput
                                    value={''}
                                    onChange={(otp) => {
                                        console.info(otp)
                                        //setOtp(otp);
                                    }}
                                    numInputs={6}
                                    inputStyle={{
                                        fontSize: '24px',
                                        width: '36px',
                                        height: '36px',
                                        margin: '4px',
                                        borderTop: '0px',
                                        borderLeft: '0px',
                                        borderRight: '0px',
                                        outline: 'none',
                                        borderColor: '#000a46',
                                    }}
                                    containerStyle={{
                                        margin: '0px auto',
                                        padding: '10px',
                                    }}
                                    isInputNum
                                  />*/}

                                <Typography variant='caption' color='GrayText'>
                                    Ingresa el codigo que enviamos a +505-1234-5678
                                </Typography>
                            </div>

                            <LoadingButton
                                type='submit'
                                loading={isLoading}
                                loadingPosition='start'
                                variant='contained'
                                fullWidth>
                                Resetear contraseña
                            </LoadingButton>
                        </Stack>
                    </FormProvider>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant='subtitle2' component='span' color='initial'>
                        <Link to='/auth/sign-up'>Crear nueva cuenta</Link>.
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}

export default Register
