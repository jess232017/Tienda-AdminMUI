import React from 'react';

import { Link } from 'react-router-dom';

//mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import DownImage from '@/pages/error/images/server_down.svg';

const ServerDown = () => {
    return (
        <Box sx={{ height: '100%', display: 'flex' }}>
            <Box sx={{ width: '50%', margin: 'auto', textAlign: 'center' }}>
                <img src={DownImage} width={350} alt="Parece que hay problemas con el servidor" />
                <h3 className="mt-4">Uy! Problemas con el servidor</h3>
                <p>La pagina que estas visitando presento problemas al conseguir la informacion, favor intentelo mas tarde.</p>
                <Button sx={{ mt: 2 }} component={Link} to="/" variant="contained" size="large">
                    Regresar al inicio
                </Button>
            </Box>
        </Box>
    );
};

export default ServerDown;
