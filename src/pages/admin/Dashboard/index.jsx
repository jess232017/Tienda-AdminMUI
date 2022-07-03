import React from 'react';

import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';

import { useTheme } from '@mui/styles';

import TopFive from './TopFive';
import Counters from './Counters';
import SalesMade from './SalesMade';
import ItemDetails from './ItemDetails';
import SalesCounter from './SalesCounter';
import TopEmployees from './TopEmployees';
import NewTransactions from './NewTransactions';

import { gridSpacing } from '@/services/constant';

const Default = () => {
    const { t } = useTranslation();

    return (
        <>
            <Counters />
            <Grid container spacing={gridSpacing} mb={2}>
                <Grid item xs={12} md={6}>
                    <ItemDetails />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TopFive />
                </Grid>
                <Grid item xs={12} md={6}>
                    <SalesMade />
                </Grid>
                <Grid item xs={12} md={6}>
                    <SalesCounter />
                </Grid>
                <Grid item xs={12} md={5}>
                    <TopEmployees />
                </Grid>
                <Grid item xs={12} md={7}>
                    <NewTransactions />
                </Grid>
            </Grid>
        </>
    );
};

export default Default;
