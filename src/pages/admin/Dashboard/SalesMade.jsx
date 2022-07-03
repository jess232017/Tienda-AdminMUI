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
import value from '@/assets/scss/themes-vars';

/*const chartData = {
    options: {
        chart: {
            zoom: {
                enabled: false,
            },
            dropShadow: {
                enabled: true,
                top: 3,
                left: 2,
                blur: 4,
                opacity: 1,
            },
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        }, title: {
            text: 'Media',
            align: 'left',
            offsetY: 25,
            offsetX: 20
          },
          subtitle: {
            text: 'Statistics',
            offsetY: 55,
            offsetX: 20
          },
          markers: {
            size: 6,
            strokeWidth: 0,
            hover: {
              size: 9
            }
          },
          grid: {
            show: true,
            padding: {
              bottom: 0
            }
          },
    },
    series: [
        {
            name: 'Music',
            data: [11, 15, 26, 20, 33, 27],
        },
        {
            name: 'Photos',
            data: [32, 33, 21, 42, 19, 32],
        },
        {
            name: 'Files',
            data: [20, 39, 52, 11, 29, 43],
        },
    ],
};*/

/*const chartData = {
    chart: {
        height: 100,
        width: '100%',
        type: 'line',
        zoom: {
            enabled: true,
        },
        dropShadow: {
            enabled: true,
            top: 3,
            left: 2,
            blur: 4,
            opacity: 1,
        },
    },
    options: {
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        //colors: ["#3F51B5", '#2196F3'],

        title: {
            text: 'Media',
            align: 'left',
            offsetY: 25,
            offsetX: 20,
        },
        subtitle: {
            text: 'Statistics',
            offsetY: 55,
            offsetX: 20,
        },
        markers: {
            size: 6,
            strokeWidth: 0,
            hover: {
                size: 9,
            },
        },
        grid: {
            show: true,
            padding: {
                bottom: 0,
            },
        },
        labels: ['01/15/2002', '01/16/2002', '01/17/2002', '01/18/2002', '01/19/2002', '01/20/2002'],
        xaxis: {
            tooltip: {
                enabled: false,
            },
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            offsetY: -20,
        },
    },
    series: [
        {
            name: 'Music',
            data: [1, 15, 26, 20, 33, 27],
        },
        {
            name: 'Photos',
            data: [3, 33, 21, 42, 19, 32],
        },
        {
            name: 'Files',
            data: [0, 39, 52, 11, 29, 43],
        },
    ],
};*/

const chartData = {
    height: 228,
    chart: {
        type: 'area',
        stacked: false,
        zoom: {
            enabled: false,
        },
    },
    options: {
        dataLabels: {
            enabled: false,
        },
        toolbar: {
            show: false,
        },
        stroke: {
            curve: 'smooth',
        },
        xaxis: {
            categories: ['2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4', '2012 Q1', '2012 Q2'],
        },
        tooltip: {
            followCursor: true,
        },
        fill: {
            opacity: 1,
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left',
        },
    },
    series: [
        {
            name: 'Music',
            data: [11, 15, 26, 20, 33, 27],
        },
        {
            name: 'Photos',
            data: [32, 33, 21, 42, 19, 32],
        },
        {
            name: 'Files',
            data: [20, 39, 52, 11, 29, 43],
        },
    ],
};

const SalesMade = () => {
    const { t } = useTranslation();

    return (
        <Card sx={{ height: '100%' }} variant="outlined">
            <CardHeader sx={{ py: 1.5 }} title={<Typography variant="subtitle1">Ventas Realizadas</Typography>} />
            <Divider />
            <CardContent>
                <Chart {...chartData} />
            </CardContent>
        </Card>
    );
};

export default SalesMade;
