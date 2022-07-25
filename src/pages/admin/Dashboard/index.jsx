import React from 'react'

import { useTranslation } from 'react-i18next'
import { Grid } from '@mui/material'

import TopFive from './TopFive'
import Counters from './Counters'
import SalesMade from './SalesMade'
import ItemDetails from './ItemDetails'
import SalesCounter from './SalesCounter'
import TopEmployees from './TopEmployees'
import NewTransactions from './NewTransactions'

import { gridSpacing } from '@/services/constant'

const Default = () => {
    const { t } = useTranslation()

    return (
        <Grid container spacing={gridSpacing} mb={2}>
            <Grid item xs={12} md={8}>
                <Counters />
                <ItemDetails />
            </Grid>
            <Grid item xs={12} md={4}>
                <TopFive />
                <Grid container spacing={gridSpacing} mb={2}>
                    <Grid item xs={12} md={6}></Grid>
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
            </Grid>
        </Grid>
    )
}

export default Default
