import React, { useState } from 'react'

import { useTranslation } from 'react-i18next'

//controls
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'

//icons
import TimerIcon from '@mui/icons-material/Timer'
import UpdateIcon from '@mui/icons-material/Update'
import ReceiptIcon from '@mui/icons-material/Receipt'
import LocalMallIcon from '@mui/icons-material/LocalMallTwoTone'
import ShoppingCartIcon from '@mui/icons-material/AddShoppingCart'

import PageCard from '@/common/PageCard'
import Toolbar from '@/components/Toolbar'
import api from '@/api/tasks/ApiOrder'
import usePagination from '@/services/hooks/usePagination'

const columns = [
    { field: 'id', headerName: 'Codigo', width: 100, headerClassName: 'super-app-theme--header' },
    { field: 'vendorName', headerName: 'Vendedor', width: 150, headerClassName: 'super-app-theme--header' },
    { field: 'clientName', headerName: 'Cliente', width: 150, headerClassName: 'super-app-theme--header' },
    { field: 'date', headerName: 'Fecha', width: 100, headerClassName: 'super-app-theme--header' },
    { field: 'subTotal', headerName: 'SubTotal', width: 100 },
    { field: 'total', headerName: 'Total', width: 100 },
    { field: 'paidWith', headerName: 'Pago con', width: 100 },
    { field: 'paymentName', headerName: 'Metodo Pago', width: 100 },
    { field: 'status', headerName: 'Estado', width: 100 },
    { field: 'note', headerName: 'Comentario', width: 100 },
]

const Ventas = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { control, selected, isLoading, isError } = usePagination(api, columns)

    const onClickTomar = () => navigate('/admin/venta/nueva')

    console.log('selected', selected)
    const onClickDetail = () => navigate('/admin/venta/' + selected.id)
    const onClickDetail2 = () => console.log(selected)

    const handleChooser = () => {
        //grid.current.columnChooserModule.openColumnChooser();
    }

    return (
        <PageCard
            headerProps={{
                title: t('sold.title4'),
                subheader: t('sold.subheader'),
                avatar: <LocalMallIcon />,
            }}
            isLoading={isLoading}
            isError={isError}>
            <Toolbar onClickChooser={handleChooser}>
                <Button variant='contained' size='small' onClick={onClickTomar} startIcon={<ShoppingCartIcon />}>
                    {t('sold.title')}
                </Button>

                <Button
                    variant='contained'
                    disabled={Object.entries(selected).length < 1}
                    size='small'
                    onClick={onClickDetail}
                    startIcon={<ReceiptIcon />}>
                    {t('sold.title1')}
                </Button>

                <Button variant='contained' size='small' onClick={onClickDetail2} startIcon={<TimerIcon />}>
                    {t('sold.title2')}
                </Button>

                <Button variant='contained' size='small' onClick={onClickDetail2} startIcon={<UpdateIcon />}>
                    {t('sold.title3')}
                </Button>
            </Toolbar>

            <DataGrid {...control} />
        </PageCard>
    )
}

export default Ventas
