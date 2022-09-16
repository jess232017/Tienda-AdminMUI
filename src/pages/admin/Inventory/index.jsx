import React from 'react'
import { useTranslation } from 'react-i18next'

//controls
import { Button } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'

//Icons
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import InventoryIcon from '@mui/icons-material/InventoryTwoTone'

//owned
import PageCard from '@/common/PageCard'
import Toolbar from '@/components/Toolbar'
import Form from '@/components/forms/FormInventory/FormInventory'
import api from '@/api/tasks/ApiInventory'
import usePagination from '@/services/hooks/usePagination'
import DropButton, { MenuItem } from '@/components/DropButton'
import useCrud from '@/services/hooks/useCrud'

const URL = import.meta.env.VITE_API_REPORT_URL

const columns = [
    { field: 'id', headerName: 'Codigo', width: 100 },
    { field: 'loteId', headerName: 'Id Lote', width: 100 },
    { field: 'reason', headerName: 'Motivo', width: 100 },
    { field: 'createdAt', headerName: 'Fecha', type: 'dateTime', width: 100 },
    { field: 'status', headerName: 'Estado', width: 100 },
    { field: 'quantity', headerName: 'Cantidad', width: 100 },
    { field: 'unitPrice', headerName: 'Costo Unitario', width: 100 },
    { field: 'subTotal', headerName: 'Sub Total', width: 100 },
    { field: 'total', headerName: 'Total', width: 100 },
    { field: 'note', headerName: 'Nota', width: 100 },
]

const Inventario = () => {
    const { t } = useTranslation()
    const { control, data, selected, isLoading, isError } = usePagination(api, columns)
    const { handleAdd, handleEdit, handleDelete } = useCrud(api, Form, selected)

    const onClickExpiring = () =>
        window
            .open(
                URL + '/3e8f9414-ef6d-4b47-9896-6b12a527be1b/Reportes/Productos%20a%20Vencer?showmyreports=1',
                '_blank',
            )
            .focus()
    const onClickExpired = () =>
        window
            .open(URL + '/f775b04a-6901-464a-be29-efd91a2695aa/Reportes/Productos%20Vencidos?showmyreports=1', '_blank')
            .focus()

    const handleChooser = () => {}

    const handlePrint = () => {}

    return (
        <PageCard
            headerProps={{
                title: t('inventory.title'),
                subheader: t('inventory.subheader'),
                avatar: <InventoryIcon />,
            }}
            isLoading={isLoading}
            isError={isError}>
            <Toolbar onClickChooser={handleChooser}>
                <Button variant='contained' size='small' onClick={handleAdd} startIcon={<AddIcon />}>
                    {t('crud.add')}
                </Button>

                <Button
                    variant='contained'
                    disabled={Object.entries(selected).length < 1}
                    size='small'
                    onClick={handleEdit}
                    startIcon={<EditIcon />}>
                    {t('crud.edit')}
                </Button>
                <Button
                    variant='contained'
                    disabled={Object.entries(selected).length < 1}
                    size='small'
                    onClick={handleDelete}
                    startIcon={<DeleteIcon />}>
                    {t('crud.delete')}
                </Button>

                <DropButton id='reporte' title={t('inventory.report')} startIcon={<AnalyticsIcon />}>
                    <MenuItem startIcon={<AnalyticsIcon />} onClick={onClickExpiring} children='Por vencer' />

                    <MenuItem startIcon={<AnalyticsIcon />} onClick={onClickExpired} children='Vencidos' />

                    <MenuItem startIcon={<AnalyticsIcon />} onClick={handlePrint} children='Imprimir' />
                </DropButton>
            </Toolbar>

            <DataGrid {...control} />
        </PageCard>
    )
}

export default Inventario
