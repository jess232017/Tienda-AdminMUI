import value from '@/assets/scss/themes-vars';

const revenueChart = {
    height: 228,
    type: 'donut',
    options: {
        dataLabels: {
            enabled: false,
        },
        labels: ['Producto', 'Producto', 'Producto'],
        legend: {
            show: true,
            position: 'bottom',
            fontFamily: 'inherit',
            labels: {
                colors: 'inherit',
            },
        },
        itemMargin: {
            horizontal: 10,
            vertical: 10,
        },
        colors: [value.error, value.primary, value.info],
    },
    series: [1258, 975, 500],
};

export default revenueChart;
