import React from 'react'

//control
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
    email: Yup.string()
        .required('El correo es requerido')
        .min(6, 'El correo debe tener al menos 6 caracteres')
        .max(50, 'El correo no debe exceder los 50 caracteres')
        .email('El correo es invalido'),
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
        <Box width={350}>
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
                                <Typography variant='h4'>Recuperar contraseña</Typography>
                            </Stack>
                            <Input name='email' placeHolder='Correo' />

                            <LoadingButton
                                type='submit'
                                loading={isLoading}
                                loadingPosition='start'
                                variant='contained'
                                fullWidth>
                                Restablecer contraseña
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
