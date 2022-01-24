import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Card, CardHeader, CardContent, Typography } from '@mui/material';
import ProfilePicture from './ProfilePicture';

const Setting = () => {
    return (
        <>
            <Typography variant="h2" sx={{ mb: 4 }}>Configuraciones</Typography>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Box mb={2}>
                            <ProfilePicture />
                        </Box>
                        <Box mb={2}>
                            <Card >
                                <CardHeader
                                    title="Idioma y Hora"
                                />
                            </Card>
                        </Box>

                        <Box mb={2}>
                            <Card>
                                <CardHeader
                                    title="Cuentas sociales"
                                />
                            </Card>
                        </Box>
                        <Box mb={2}>
                            <Card>
                                <CardHeader
                                    title="Otras cuentas"
                                />
                            </Card>
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Box mb={2}>
                            <Card >
                                <CardHeader
                                    title="Informacion en general"
                                />
                            </Card>
                        </Box>
                        <Box mb={2}>
                            <Card>
                                <CardHeader
                                    title="Informacion de la contraseña"
                                />
                            </Card>
                        </Box>
                        <Box mb={2}>
                            <Card>
                                <CardHeader
                                    title="Sesiones"
                                />
                            </Card>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Box mb={2}>
                            <Card >
                                <CardHeader
                                    title="Alertas y notificaciones"
                                />
                            </Card>
                        </Box>

                    </Grid>
                    <Grid item xs={6}>
                        <Box mb={2}>
                            <Card >
                                <CardHeader
                                    title="Notificaciones por correo"
                                />
                            </Card>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default Setting;