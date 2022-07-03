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
        xaxis: {
            categories: ['2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4', '2012 Q1', '2012 Q2'],
        },
        tooltip: {
            followCursor: true,
        },
        fill: {
            opacity: 1,
        },
    },
    series: [
        {
            data: [0, 20, 10, 50, 30, 80, 35, 65, 20, 30, 0],
        },
    ],
};

export default support;
