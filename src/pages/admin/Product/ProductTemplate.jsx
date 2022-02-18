import React from 'react';
import { Avatar, Box, Stack, Typography } from '@mui/material';

const ProductTemplate = ({ image, name, description }) => {
    return (
        <Box width="100%" display="flex">
            <Avatar alt={name} src={`data:image/png;base64,${image}`} variant="rounded" />
            <Stack ml={2}>
                <Typography variant="subtitle1" >
                    {name}
                </Typography>
                <Typography variant="caption" >
                    {description}
                </Typography>
            </Stack>
        </Box>
    )
}

export default ProductTemplate;