import React from 'react';

import { VisibilityOutlined } from '@mui/icons-material';
import { Avatar, Box, Stack, Typography, Button } from '@mui/material';

import api from '@/api/tasks/ApiOrder';

const NewTransactions = () => {
    const { data, isLoading: loading, isError } = api.get(1, 10);

    return (
        <div style={{ display: 'flex', height: '16rem' }}>
            {data?.data.map(({ image, firstName, lastName, email }) => (
                <Box width="100%">
                    <Box width="100%" display="flex" justifyContent="space-between" alignItems="center">
                        <Box display="flex">
                            <Avatar alt={firstName} src={image} variant="circular" onClick={() => setViewer(true)} />
                            <Stack ml={2}>
                                <Typography variant="subtitle1">{`${firstName} ${lastName}`}</Typography>
                                <Typography variant="caption">{email}</Typography>
                            </Stack>
                        </Box>
                        <Button variant="contained" startIcon={<VisibilityOutlined />} disableElevation>
                            Ver
                        </Button>
                    </Box>
                </Box>
            ))}
        </div>
    );
};

export default NewTransactions;
