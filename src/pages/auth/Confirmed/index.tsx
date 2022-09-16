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
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

interface IConfirmedProps {}

const Confirmed: React.FC<IConfirmedProps> = (props) => {
    return (
        <Box width={350}>
            <Card>
                <CardContent sx={{ p: 6 }}>
                    <Stack spacing={2}>
                        <Stack spacing={2} alignItems='center'>
                            <Box display='flex' flexDirection='column' alignItems='center'>
                                <img src='/img/tienda.png' width={55} />
                                <Typography variant='caption' color='GrayText'>
                                    Tienda San Jose
                                </Typography>
                            </Box>
                            <Typography variant='h4' my={8}>
                                Tu correo ha sido verificado
                            </Typography>
                        </Stack>

                        <Button LinkComponent={Link} href='/auth' variant='contained' fullWidth>
                            Iniciar sesión
                        </Button>
                    </Stack>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant='subtitle2' component='span' color='initial'>
                        <Link to='/auth/sign-up'>Crear nueva cuenta</Link>.
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}

export default Confirmed
