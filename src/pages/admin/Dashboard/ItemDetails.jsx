import React from 'react'

//control
import Chart from 'react-apexcharts'

//hooks
import { useTranslation } from 'react-i18next'

//mui
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

var chartData = {
    radialBar: {
        dataLabels: {
            show: false,
        },
        track: {
            show: false,
        },
        hollow: {
            size: '90%',
        },
    },
}

const ItemDetails = () => {
    const { t } = useTranslation()

    return (
        <Card sx={{ mt: 3 }} variant='outlined'>
            <CardHeader sx={{ py: 1.5 }} title={<Typography variant='subtitle1'>Detalle de Productos</Typography>} />
            <Divider />
            <CardContent sx={{ display: 'flex' }}>
                <Grid container spacing={2} mb={2}>
                    <Grid item xs={12} md={7} display='flex' alignItems='center'>
                        <List sx={{ flex: 1, pr: 3 }}>
                            <ListItem sx={{ paddingX: 0, paddingY: 1 }} secondaryAction={0}>
                                <ListItemText primary='Inventario bajo' primaryTypographyProps={{ color: 'error' }} />
                            </ListItem>
                            <ListItem sx={{ paddingX: 0, paddingY: 1 }} secondaryAction={0}>
                                <ListItemText primary='Categorias' />
                            </ListItem>
                            <ListItem sx={{ paddingX: 0, paddingY: 1 }} secondaryAction={0}>
                                <ListItemText primary='Lotes Vencidos' />
                            </ListItem>
                            <ListItem sx={{ paddingX: 0, paddingY: 1 }} secondaryAction={0}>
                                <ListItemText primary='Productos Total' />
                            </ListItem>
                        </List>
                    </Grid>

                    <Grid item xs={12} md={5} display='flex'>
                        <Divider orientation='vertical' />
                        <Box pl={2}>
                            <Typography variant='subtitle1' textAlign='center'>
                                Productos Disponibles
                            </Typography>
                            <Chart
                                type='radialBar'
                                height={228}
                                options={{ ...chartData, labels: ['99%'] }}
                                series={[90]}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default ItemDetails
