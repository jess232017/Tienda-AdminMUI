import React from 'react'

import { Link } from 'react-router-dom'

//mui
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import SecureImage from '@/pages/error/images/secure_login.svg'

const NoFound = () => {
    return (
        <Box sx={{ height: '100%', display: 'flex' }}>
            <Box sx={{ width: '50%', margin: 'auto', textAlign: 'center' }}>
                <img src={SecureImage} width={350} alt='No tiene permiso para ver este sitio' />
                <h3 className='mt-4'>Uy! Pagina bajo mantenimiento 🚧</h3>
                <p>Lo lamentamos mucho, pero la pagina que estas buscando esta bajo mantimiento en este momento.</p>
                <Button sx={{ mt: 2 }} component={Link} to='/' variant='contained' size='large'>
                    Regresar al inicio
                </Button>
            </Box>
        </Box>
    )
}

export default NoFound
