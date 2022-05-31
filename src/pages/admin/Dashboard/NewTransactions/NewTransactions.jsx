import React from 'react';

import { VisibilityOutlined } from '@mui/icons-material';
import { Avatar, Box, Stack, Typography, Button } from '@mui/material';

import api from '@/api/tasks/ApiOrder';
import Loader from '@/components/Loader';

const NewTransactions = () => {
    const { data, isLoading: loading, isError } = api.get(1, 10);

    return (
        <div style={{ display: 'flex', height: '16rem' }}>
            {loading ? (
                <Loader />
            ) : (
                <Box component="table" sx={{ width: '100%' }}>
                    <tbody>
                        <tr>
                            <Box component="th" sx={{ textAlign: 'left' }}>
                                Cliente
                            </Box>
                            <Box component="th" sx={{ textAlign: 'left' }}>
                                Fecha
                            </Box>
                            <Box component="th" sx={{ textAlign: 'left' }}>
                                Cantidad
                            </Box>
                            <Box component="th" sx={{ textAlign: 'left' }}>
                                Estado
                            </Box>
                        </tr>
                        {Array.from(Array(3)).map((_, index) => (
                            <tr key={index}>
                                <Box component="td" sx={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}>
                                    <Avatar
                                        alt="Remy Sharp"
                                        src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=650&amp;w=940"
                                        sx={{ marginRight: 2 }}
                                    />
                                    <Typography component="span" variant="h6">
                                        Susan Carol
                                    </Typography>
                                </Box>
                                <td>2 Jun 2021</td>
                                <td>$122.00</td>
                                <td>
                                    <button className="widgetLgButton Approved">Approved</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Box>
            )}
        </div>
    );
};
export default NewTransactions;
