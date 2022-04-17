import value from '@/assets/scss/themes-vars';

const support = {
    type: 'area',
    height: 145,
    options: {
        chart: {
            sparkline: {
                enabled: true,
            },
        },
        dataLabels: {
            enabled: false,
        },
        colors: [value.primary],
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        tooltip: {
            fixed: {
                enabled: false,
            },
            x: {
                show: false,
            },
            y: {
                title: {
                    formatter: (seriesName) => 'Ticket ',
                },
            },
            marker: {
                show: false,
            },
        },
    },
    series: [
        {
            data: [0, 20, 10, 50, 30, 80, 35, 65, 20, 30, 0],
        },
    ],
};

export default support;
