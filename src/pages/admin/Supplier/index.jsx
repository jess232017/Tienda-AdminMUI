import React from 'react'
import { useTranslation } from 'react-i18next'

//controls
import { Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

//Icons
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import TransportationIcon from '@mui/icons-material/EmojiTransportationTwoTone'

//Owned
import PageCard from '@/common/PageCard'
import api from '@/api/tasks/ApiSupplier'
import Form from '@/components/forms/FormSupplier/FormSupplier'
import usePagination from '@/services/hooks/usePagination'
import useCrud from '@/services/hooks/useCrud'
import Toolbar from '@/components/Toolbar'
/*
"Id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "Business": "string",
      "FirstName": "string",
      "LastName": "string",
      "Address": "string",
      "Status": true,
      "PhoneNumber": "string"
*/
const columns = [
    { field: 'id', headerName: 'Codigo', width: 100 },
    { field: 'firstName', headerName: 'Nombre', width: 150 },
    { field: 'lastName', headerName: 'Apellido', width: 150 },
    { field: 'address', headerName: 'Direccion', width: 250 },
    { field: 'status', headerName: 'Estado', width: 100 },
    { field: 'phoneNumber', headerName: 'Telefono', width: 100 },
    { field: 'business', headerName: 'Negocio', width: 100 },
]

const index = () => {
    const { t } = useTranslation()
    const { control, data, selected, isLoading, isError } = usePagination(api, columns)
    const { handleAdd, handleEdit, handleDelete } = useCrud(api, Form, selected)

    const handleChooser = () => {}

    return (
        <PageCard
            headerProps={{
                title: t('supplier.title'),
                subheader: t('supplier.subheader'),
                avatar: <TransportationIcon />,
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
            </Toolbar>

            <DataGrid {...control} />
        </PageCard>
    )
}

export default index
