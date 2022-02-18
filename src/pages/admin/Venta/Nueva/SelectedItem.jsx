import React from 'react';
import { Avatar, Box, Stack, Typography } from '@mui/material';

const SelectedItem = ({ row }) => {
    const { nombre, imagen, cantidad, precio } = row || {};;

    return (
        <Box width="100%" display="flex">
            {/*<Avatar alt={nombre} src={`data:image/png;base64,${imagen}`} variant="rounded" /> */}
            <Stack>
                <Typography variant="subtitle1" >
                    {nombre}
                </Typography>
                <Typography variant="caption" >
                    {`${precio} * ${cantidad} uds = ${(precio * cantidad).toFixed(2)}`}
                </Typography>
            </Stack>
        </Box>
    )
}

export default SelectedItem;