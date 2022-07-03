import React from 'react';

//control
import Chart from 'react-apexcharts';

//hooks
import { useTranslation } from 'react-i18next';

//mui
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';

const chartData = {
    options: {
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: true,
            fontFamily: 'inherit',
            labels: {
                colors: 'inherit',
            },
        },
        itemMargin: {
            horizontal: 10,
            vertical: 10,
        },
        colors: ['#2195f2', '#f34336', '#fec007', '#607d8a', '#00bbd3'],
    },
};

const TopFive = ({ data }) => {
    const { t } = useTranslation();
    return (
        <Card variant="outlined">
            <CardHeader sx={{ py: 1.5 }} title={<Typography variant="subtitle1">{t('dashboard.cardheader')}</Typography>} />
            <Divider />
            <CardContent>
                <Chart
                    type="pie"
                    height={240}
                    {...chartData}
                    series={[233, 123, 34, 75, 238]}
                    options={{ ...chartData.options, labels: ['Producto 3', 'Producto 6', 'Producto 3', 'Producto 7', 'Producto 6'] }}
                />
            </CardContent>
        </Card>
    );
};

export default TopFive;
