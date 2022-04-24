import React from 'react';

import { Outlet } from 'react-router-dom';

import Lottie from 'lottie-react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

//owned
import animationData from './shopping.json';

const Auth = () => {
    return (
        <Box className="auth-bg" sx={{ backgroundColor: 'background.default' }}>
            <Container fixed>
                <Grid container spacing={{ xs: 3, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={4} sm={8} md={6}>
                        <Outlet />
                    </Grid>
                    <Grid item xs={4} sm={8} md={6}>
                        <Box
                            width="100%"
                            height="100%"
                            display="flex"
                            alignItems="center"
                            flexDirection="column"
                            justifyContent="center"
                            padding={5}
                        >
                            <Lottie animationData={animationData} loop={true} autoPlay={true} height={300} width={300} />

                            <Typography variant="h1" color="primary">
                                Distribuidora San José
                            </Typography>
                            <Typography variant="subtitle2">Donde encuentras lo que buscas.</Typography>
                            <Typography variant="subtitle1">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Auth;
