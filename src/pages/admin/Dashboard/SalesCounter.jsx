import React from 'react';

//control
import Chart from 'react-apexcharts';

//hooks
import { useTranslation } from 'react-i18next';

//mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';

const chartData = {
    height: 228,
    type: 'bar',
    options: {
        plotOptions: {
            bar: {
                borderRadius: 5,
                dataLabels: {
                    position: 'top', // top, center, bottom
                },
            },
        },
        dataLabels: {
            enabled: true,
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ['#304758'],
            },
        },
        xaxis: {
            categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            position: 'top',
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            crosshairs: {
                fill: {
                    type: 'gradient',
                    gradient: {
                        colorFrom: '#D8E3F0',
                        colorTo: '#BED1E6',
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                    },
                },
            },
            tooltip: {
                enabled: true,
            },
        },
        yaxis: {
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
            },
            toolbar: {
                show: false,
                tools: {
                    download: false,
                },
            },
        },
    },
    series: [
        {
            name: 'Total Ventas',
            data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
        },
    ],
};

const SalesMade = () => {
    const { t } = useTranslation();

    return (
        <Card sx={{ height: '100%' }} variant="outlined">
            <CardHeader sx={{ py: 1.5 }} title={<Typography variant="subtitle1">Ventas realizadas por Mes</Typography>} />
            <Divider />
            <CardContent>
                <Chart {...chartData} />
            </CardContent>
        </Card>
    );
};

export default SalesMade;
