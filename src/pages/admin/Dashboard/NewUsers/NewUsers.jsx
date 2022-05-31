import React from 'react';

import { Link } from 'react-router-dom';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { VisibilityOutlined } from '@mui/icons-material';
import { Avatar, Box, Stack, Typography, Button } from '@mui/material';

import api from '@/api/tasks/ApiUser';
import Loader from '@/components/Loader';

const NewUsers = () => {
    const { data, isLoading: loading, isError } = api.get(1, 10);

    return (
        <PerfectScrollbar style={{ display: 'flex', height: '16rem', overflowX: 'hidden', alignItems: 'start' }}>
            {loading ? (
                <Loader />
            ) : (
                <Box display="flex" flexDirection="column" width="100%">
                    {data?.data.map(({ image, firstName, lastName, email, id }) => (
                        <Box key={id} width="100%" display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Box display="flex">
                                <Avatar alt={firstName} src={image} variant="circular" onClick={() => setViewer(true)} />
                                <Stack ml={2}>
                                    <Typography variant="subtitle1">{`${firstName} ${lastName}`}</Typography>
                                    <Typography variant="caption">{email}</Typography>
                                </Stack>
                            </Box>
                            <Button
                                variant="contained"
                                LinkComponent={Link}
                                to="cliente"
                                startIcon={<VisibilityOutlined />}
                                disableElevation
                            >
                                Ver
                            </Button>
                        </Box>
                    ))}
                </Box>
            )}
        </PerfectScrollbar>
    );
};

export default NewUsers;
