import React from 'react'

import { Outlet } from 'react-router-dom'

import Lottie from "lottie-react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

//owned
import animationData from './shopping.json';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const Auth = () => {
    return (
        <div className="auth-bg">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 px-lg-4">
                        <Outlet />
                    </div>
                    <div className="col-lg-6 col-xl-5 ms-xl-auto px-lg-4">
                        <Box
                            width="100%"
                            height="100%"
                            display="flex"
                            alignItems="center"
                            flexDirection="column"
                            justifyContent="center"
                            gap={2}
                        >
                            <Lottie animationData={animationData} loop={true} autoPlay={true}
                                height={300}
                                width={300} />

                            <Typography variant="h1" color="primary">
                                Distribuidora San José
                            </Typography>
                            <Typography variant="subtitle2">
                                Donde encuentras lo que buscas.
                            </Typography>
                            <Typography variant="subtitle1">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.
                            </Typography>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth;