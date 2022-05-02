import React from 'react';

import { Route, Routes } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

//owned
import Loader from '@/components/Loader';

const Login = React.lazy(() => import('@/pages/auth/Login'));
const Register = React.lazy(() => import('@/pages/auth/Register'));
const NoFound = React.lazy(() => import('@/pages/error/NoFound'));

const Auth = () => {
    return (
        <div className="auth-bg">
            <div className="bk-transaparent">
                <Container fixed>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <React.Suspense fallback={<Loader />}>
                            <Routes>
                                <Route index element={<Login />} />
                                <Route path="sign-up" element={<Register />} />
                                <Route path="*" element={<NoFound />} />
                            </Routes>
                        </React.Suspense>
                    </Box>
                </Container>
            </div>
        </div>
    );
};

export default Auth;
