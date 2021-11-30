import React from 'react';
import {  Grid, Card, CardHeader, CardContent, Hidden, Typography, Divider, LinearProgress } from '@mui/material';

import { styled } from '@mui/system';
import { makeStyles, useTheme } from '@mui/styles';

import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import MonetizationOnTwoTone from '@mui/icons-material/MonetizationOnTwoTone';
import DescriptionTwoTone from '@mui/icons-material/DescriptionTwoTone';
import ThumbUpAltTwoTone from '@mui/icons-material/ThumbUpAltTwoTone';
import CalendarTodayTwoTone from '@mui/icons-material/CalendarTodayTwoTone';

import SalesLineCard from './SalesLineCard';
import SalesLineCardData from './chart/sale-chart-1';

import RevenuChartCard from './RevenuChartCard';
import RevenuChartCardData from './chart/revenu-chart';

import ReportCard from './ReportCard';
import LatestorderCard from './LatestorderCard';

import { gridSpacing } from 'src/services/constant';

const FlatCardBody = styled(CardContent)({
    padding: '0px !important',
    '& svg': {
        width: '40px',
        height: '40px',
    },
});

const FlatCardBlock = styled(Grid)(({ theme }) => ({
    padding: '25px 25px',
    borderLeft: '1px solid' + theme.palette.background.default,
    [theme.breakpoints.down('xs')]: {
        borderLeft: 'none',
        borderBottom: '1px solid' + theme.palette.background.default,
    },
    [theme.breakpoints.down('sm')]: {
        borderBottom: '1px solid' + theme.palette.background.default,
    },
}));

const Default = () => {
    const theme = useTheme();

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={3} sm={6} xs={12}>
                        <ReportCard
                            primary="C$30200"
                            secondary="Todas las ventas"
                            color={theme.palette.warning.main}
                            footerData="10% de ganancias"
                            iconPrimary={MonetizationOnTwoTone}
                            iconFooter={TrendingUpIcon}
                        />
                    </Grid>
                    <Grid item lg={3} sm={6} xs={12}>
                        <ReportCard
                            primary={145}
                            secondary="Lotes vencidos"
                            color={theme.palette.error.main}
                            footerData="28% de perdidas"
                            iconPrimary={CalendarTodayTwoTone}
                            iconFooter={TrendingDownIcon}
                        />
                    </Grid>
                    <Grid item lg={3} sm={6} xs={12}>
                        <ReportCard
                            primary="290+"
                            secondary="Clientes nuevos"
                            color={theme.palette.success.main}
                            footerData="1k de visitas"
                            iconPrimary={DescriptionTwoTone}
                            iconFooter={TrendingUpIcon}
                        />
                    </Grid>
                    <Grid item lg={3} sm={6} xs={12}>
                        <ReportCard
                            primary={500}
                            secondary="Descargas"
                            color={theme.palette.primary.main}
                            footerData="1k de descargas"
                            iconPrimary={ThumbUpAltTwoTone}
                            iconFooter={TrendingUpIcon}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={8} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={6}>
                                <Grid container spacing={gridSpacing} direction="column">
                                    <Grid item xs={12}>
                                        <SalesLineCard
                                            chartData={SalesLineCardData}
                                            title="Ventas en el dia"
                                            percentage="3%"
                                            icon={<TrendingDownIcon />}
                                            footerData={[
                                                {
                                                    value: '$4230',
                                                    label: 'Total Vendido',
                                                },
                                                {
                                                    value: '321',
                                                    label: 'Cantidad Vendida',
                                                },
                                            ]}
                                        />
                                    </Grid>
                                    <Hidden only="sm">
                                        <Grid item xs={12}>
                                            <Card>
                                                <FlatCardBody>
                                                    <Grid container alignItems="center" spacing={0}>
                                                        <FlatCardBlock item sm={6} xs={12}>
                                                            <Grid container alignItems="center" spacing={1}>
                                                                <Grid item>
                                                                    <Typography variant="subtitle2" align="left">
                                                                        REALTY
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item sm zeroMinWidth>
                                                                    <Typography variant="h5" sx={{color: 'error.main'}} align="right">
                                                                        -0.99
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </FlatCardBlock>
                                                        <FlatCardBlock item sm={6} xs={12}>
                                                            <Grid container alignItems="center" spacing={1}>
                                                                <Grid item>
                                                                    <Typography variant="subtitle2" align="left">
                                                                        INFRA
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item sm zeroMinWidth>
                                                                    <Typography variant="h5" sx={{color: 'success.main'}} align="right">
                                                                        -7.66
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </FlatCardBlock>
                                                    </Grid>
                                                </FlatCardBody>
                                            </Card>
                                        </Grid>
                                    </Hidden>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <RevenuChartCard chartData={RevenuChartCardData} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        <Card>
                            <CardHeader
                                title={
                                    <Typography variant="h6" gutterBottom component="div">
                                        Origen de trafico
                                    </Typography>
                                }
                            />
                            <Divider />
                            <CardContent>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item xs={12}>
                                        <Grid container alignItems="center" spacing={1}>
                                            <Grid item sm zeroMinWidth>
                                                <Typography variant="body2">Direct</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2" align="right">
                                                    80%
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <LinearProgress variant="determinate" value={80} color="primary" />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container alignItems="center" spacing={1}>
                                            <Grid item sm zeroMinWidth>
                                                <Typography variant="body2">Social</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2" align="right">
                                                    50%
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <LinearProgress variant="determinate" value={50} color="secondary" />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container alignItems="center" spacing={1}>
                                            <Grid item sm zeroMinWidth>
                                                <Typography variant="body2">Referral</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2" align="right">
                                                    20%
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <LinearProgress variant="determinate" value={20} color="primary" />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container alignItems="center" spacing={1}>
                                            <Grid item sm zeroMinWidth>
                                                <Typography variant="body2">Bounce</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2" align="right">
                                                    60%
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <LinearProgress variant="determinate" value={60} color="secondary" />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container alignItems="center" spacing={1}>
                                            <Grid item sm zeroMinWidth>
                                                <Typography variant="body2">Internet</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2" align="right">
                                                    40%
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <LinearProgress variant="determinate" value={40} color="primary" />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <LatestorderCard title="Ultimos pedidos" />
            </Grid>
        </Grid>
    );
};

export default Default;
