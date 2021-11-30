import React from 'react';

import { Link } from 'react-router-dom';

//mui
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';

import SecureImage from 'src/views/error/images/secure_login.svg';

const NoFound = () => {
    return (
        <Box sx={{ mt: 15, mb: 15 }}>
            <div className="w-50 mx-auto text-center mt-5 mb-5">
                <img src={SecureImage} width={350} alt="No tiene permiso para ver este sitio" />
                <h3 className="mt-4">Uy! No tiene permiso para ver este sitio</h3>
                <p>La pagina que estas buscando no se encuentra disponible actualmente de acuerdo a los privilegios del sitio otorgados</p>
                <Button sx={{ mt: 2 }} component={Link} to="/" variant="contained" size="large">
                    Regresar al inicio
                </Button>
            </div>
        </Box>
    );
}

export default NoFound;