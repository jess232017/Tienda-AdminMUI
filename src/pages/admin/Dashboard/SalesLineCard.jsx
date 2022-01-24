import React from 'react';

import { useTheme } from '@mui/styles';
import Chart from 'react-apexcharts';

import { Box, Card, CardContent, Grid,  Typography } from '@mui/material';


const SalesLineCard = (props) => {
    const theme = useTheme();

    const { bgColor, chartData, footerData, icon, title, percentage } = props;

    let footerHtml;
    if (footerData) {
        footerHtml = footerData.map((item, index) => {
            return (
                <Grid item key={index}>
                    <Box mt={3} mb={3} p={1}>
                        <Grid
                            container
                            spacing={1}
                            direction="column"
                            alignItems="center"
                        >
                            <Typography variant="h4">{item.value}</Typography>
                            <Typography variant="subtitle2" color="secondary">
                                {item.label}
                            </Typography>
                        </Grid>
                    </Box>
                </Grid>
            );
        });
    }

    return (
        <Card>
            <CardContent 
                sx={{padding: 0, paddingBottom: "0px!important"}}
            >
                <Box color="#fff" bgcolor={bgColor ? bgColor : theme.palette.primary.main} p={3}>
                    <Grid container direction="column" spacing={1}>
                        <Grid item container sx={{justifyContent: "space-between", alignItems: "center"}}>
                            {title && (
                                <Grid item>
                                    <Typography variant="subtitle1" color="inherit">
                                        {title}
                                    </Typography>
                                </Grid>
                            )}
                            <Grid item>
                                <Grid container sx={{alignItems: "center"}}>
                                    {icon && (
                                        <Box component="span" mr={2}>
                                            {icon}
                                        </Box>
                                    )}
                                    {percentage && (
                                        <Typography variant="subtitle1" color="inherit">
                                            {percentage}
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                        {chartData && (
                            <Grid item>
                                <Chart {...chartData} />
                            </Grid>
                        )}
                    </Grid>
                </Box>
                {footerData && (
                    <Grid container justifyContent="space-around" alignItems="center">
                        {footerHtml}
                    </Grid>
                )}
            </CardContent>
        </Card>
    );
};

export default SalesLineCard;
