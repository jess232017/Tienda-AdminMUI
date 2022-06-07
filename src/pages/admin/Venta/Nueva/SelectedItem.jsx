import React from 'react';
import { Avatar, Box, Stack, Typography } from '@mui/material';

const SelectedItem = ({ row }) => {
    const { name, image, quantity, price } = row || {};

    return (
        <Box width="100%" display="flex">
            <Stack>
                <Typography variant="subtitle1">{name}</Typography>
                <Typography variant="caption">{`${price} * ${quantity} uds = ${(price * quantity).toFixed(2)}`}</Typography>
            </Stack>
        </Box>
    );
};

export default SelectedItem;
