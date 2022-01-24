import React from 'react';

import { Link } from 'react-router-dom';

//mui
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';

import NotFoundImage from '_@/pages/error/images/not_found.svg';

const NoFound = () => {
    return (
        <Box sx={{ mt: 15, mb: 15 }}>
            <div className="w-50 mx-auto text-center mt-5 mb-5">
                <img src={NotFoundImage} width={350} alt="Pagina no encontrada" />
                <h3 className="mt-4">Uy! Pagina no encontrada</h3>
                <p>La pagina que estas buscando no existe o su direccion esta mal escrita.</p>
                <Button sx={{ mt: 2 }} component={Link} to="/" variant="contained" size="large">
                    Regresar al inicio
                </Button>
            </div>
        </Box>
    );
}

export default NoFound;
