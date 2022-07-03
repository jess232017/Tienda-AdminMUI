import React from 'react';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';

import api from '@/api/tasks/ApiOrder';
import Loader from '@/components/Loader';

const NewTransactions = () => {
    const { t } = useTranslation();
    const { data, isLoading: loading, isError } = api.get(1, 10);

    return (
        <Card sx={{ height: '100%' }} variant="outlined">
            <CardHeader sx={{ py: 1.5 }} title={<Typography variant="subtitle1">Ultimas Transacciones</Typography>} />
            <Divider />
            <CardContent>
                <div style={{ display: 'flex', height: '16rem' }}>
                    {loading ? (
                        <Loader />
                    ) : (
                        <Box component="table" sx={{ width: '100%' }}>
                            <tbody>
                                <tr>
                                    <Box component="th" sx={{ textAlign: 'left' }}>
                                        {t('dashboard.box')}
                                    </Box>
                                    <Box component="th" sx={{ textAlign: 'left' }}>
                                        {t('dashboard.box1')}
                                    </Box>
                                    <Box component="th" sx={{ textAlign: 'left' }}>
                                        {t('dashboard.box2')}
                                    </Box>
                                    <Box component="th" sx={{ textAlign: 'left' }}>
                                        {t('dashboard.box3')}
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
            </CardContent>
        </Card>
    );
};
export default NewTransactions;
