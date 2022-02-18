import React from 'react';
import { Avatar, Box, Stack, Typography } from '@mui/material';

const ClientTemplate = ({ imagen, nombre, apellido, telefono }) => {
    return (
        <Box width="100%" display="flex">
            <Avatar alt={nombre} src={`data:image/png;base64,${imagen}`} variant="circular" />
            <Stack ml={2}>
                <Typography variant="subtitle1" >
                    {`${nombre} ${apellido}`}
                </Typography>
                <Typography variant="caption" >
                    {telefono}
                </Typography>
            </Stack>
        </Box>
    )
}

export default ClientTemplate;