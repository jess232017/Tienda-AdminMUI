import React from 'react';


import { styled } from '@mui/system';
import {  Card, CardContent, Grid, Typography } from '@mui/material';

const GridText = styled(Grid)(({ theme }) => ({
    padding: theme.spacing(1.2),
    paddingLeft: '20px',
    paddingRight: '20px',
    color: theme.palette.common.white,
    justifyContent: "space-between",
    alignItems: "center"
}));


const ReportCard = (props) => {
    const { primary, secondary, iconPrimary, color, footerData, iconFooter } = props;

    const IconPrimary = iconPrimary;
    const primaryIcon = iconPrimary ? <IconPrimary sx={{ fontSize: "2.18rem" }} /> : null;

    const IconFooter = iconFooter;
    const footerIcon = iconFooter ? <IconFooter /> : null;

    return (
        <Card>
            <CardContent>
                <GridText container sx={{padding: 0}}>
                    <Grid item>
                        <Typography variant="h3" style={{ color: color }}>
                            {primary}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ marginTop: '.5rem' }}>
                            {secondary}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h2" style={{ color: color }}>
                            {primaryIcon}
                        </Typography>
                    </Grid>
                </GridText>
            </CardContent>
            <div style={{ background: color }}>
                <GridText container>
                    <Grid item>
                        <Typography variant="body2">{footerData}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2">{footerIcon}</Typography>
                    </Grid>
                </GridText>
            </div>
        </Card>
    );
};

export default ReportCard;
