import React from 'react';

import styled from '@mui/system/styled';
import logo from 'src/assets/img/tienda.png';
import Box from '@mui/material/Box'

const LogoFont = styled('span')({
    fontFamily: 'Poppins',
    fontWeight: 700,
    maxWidth: "100px",
    marginLeft: ".5rem",
    whiteSpace: 'normal',
    fontSize: '1rem'
});

const Logo = ({color="#0167F3"}) => {
    return ( 
        <Box mt={0.5}>
            <Box display="flex" alignItems="center" gap=".5rem">
                <img src={logo} alt="Logo" height="35" style={{maxWidth: '52px'}} />
                <LogoFont sx={{color}}>Abarroteria San Jose</LogoFont>
            </Box>
        </Box>
    );
}
 
export default Logo;