import React from 'react'
import { useTranslation } from 'react-i18next'

//controls
import { Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

//Icons
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWalletTwoTone'

//Owned
import PageCard from '@/common/PageCard'
import api from '@/api/tasks/ApiAccountant'
import DropButton, { MenuItem } from '@/components/DropButton'
import Form from '@/components/forms/FormAccountant/FormAccountant'
import usePagination from '@/services/hooks/usePagination'
import useCrud from '@/services/hooks/useCrud'
import Toolbar from '@/components/Toolbar'

const URL = import.meta.env.VITE_API_REPORT_URL

const columns = [
    { field: 'id', headerName: 'Codigo', width: 100 },
    { field: 'userId', headerName: 'ID Usuario', width: 120 },
    {
        field: 'type',
        headerName: 'Tipo',
        width: 100,
        valueFormatter: ({ value }) => (value === 0 ? 'Ingreso' : 'Egreso'),
    },
    { field: 'amount', headerName: 'Cantidad', width: 100 },
    { field: 'reason', headerName: 'Motivo', width: 150 },
    { field: 'note', headerName: 'Observacion', flex: 1 },
    {
        field: 'createdAt',
        headerName: 'Fecha de creacion',
        type: 'dateTime',
        width: 140,
        valueGetter: ({ value }) => value && new Date(value),
    },
]
const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=0,height=0,left=-1000,top=-1000`

const index = () => {
    const { t } = useTranslation()
    const { control, data, selected, isLoading, isError } = usePagination(api, columns)
    const { handleAdd, handleEdit, handleDelete } = useCrud(api, Form, selected)

    const handleChooser = () => {}
    const onClickExpiring = () =>
        window
            .open(
                URL + '/854f1cae-0a50-4f46-bb04-12a08634e91e/Reportes/Analisis%20de%20gastos?showmyreports=1',
                'test',
                params,
            )
            .focus()

    return (
        <PageCard
            headerProps={{
                title: t('accountant.title'),
                subheader: t('accountant.subheader'),
                avatar: <AccountBalanceWalletIcon />,
            }}
            isLoading={isLoading}
            isError={isError}>
            <Toolbar onClickChooser={handleChooser}>
                <Button size='small' variant='contained' onClick={handleAdd} startIcon={<AddIcon />}>
                    {t('crud.add')}
                </Button>

                <Button size='small' variant='contained' onClick={handleEdit} startIcon={<EditIcon />}>
                    {t('crud.edit')}
                </Button>
                <Button size='small' variant='contained' onClick={handleDelete} startIcon={<DeleteIcon />}>
                    {t('crud.delete')}
                </Button>

                <DropButton id='reporte' title={t('inventory.report')} startIcon={<AnalyticsIcon />}>
                    <MenuItem startIcon={<AnalyticsIcon />} onClick={onClickExpiring} children='General' />
                </DropButton>
            </Toolbar>

            <DataGrid {...control} />
        </PageCard>
    )
}

export default index
