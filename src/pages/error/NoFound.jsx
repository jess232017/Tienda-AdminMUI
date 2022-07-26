import React from 'react'

import { Link } from 'react-router-dom'

//mui
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import NotFoundImage from '@/pages/error/images/not_found.svg'

const NoFound = () => {
    return (
        <Box sx={{ height: '100%', display: 'flex' }}>
            <Box sx={{ width: '50%', margin: 'auto', textAlign: 'center' }}>
                <img src={NotFoundImage} width={350} alt='Pagina no encontrada' />
                <h3 className='mt-4'>Uy! Pagina no encontrada ⚠️</h3>
                <p>La pagina que estas buscando no existe o su direccion esta mal escrita.</p>
                <Button sx={{ mt: 2 }} component={Link} to='/' variant='contained' size='large'>
                    Regresar al inicio
                </Button>
            </Box>
        </Box>
    )
}

export default NoFound
