import React from 'react'
import { useTranslation } from 'react-i18next'

//controls
import { Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

//Icons
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import UserIcon from '@mui/icons-material/Person'

//Owned
import PageCard from '@/common/PageCard'
import Form from '@/components/forms/FormUser/FormUser'
import { apiUser } from '../../../api/tasks/index'
import usePagination from '@/services/hooks/usePagination'
import useCrud from '@/services/hooks/useCrud'
import Toolbar from '@/components/Toolbar'
import ClientTemplate from './ClientTemplate'

const columns = [
    {
        field: 'firstName',
        headerName: 'Usuario',
        width: 325,
        renderCell: ClientTemplate,
    },
    { field: 'userName', headerName: 'Usuario', width: 150 },
    { field: 'password', headerName: 'Contraseña', width: 150, renderCell: () => <p>**********</p> },
    //{ field: 'lastName', headerName: 'Apellidos', width: 150 },
    //{ field: 'userName', headerName: 'Usuario', width: 100 },
    { field: 'phoneNumber', headerName: 'Telefono', width: 100 },
    //{ field: 'email', headerName: 'Correo', width: 200 },
    { field: 'id', headerName: 'Codigo', width: 200 },
]

const User = () => {
    const { t } = useTranslation()
    const { control, selected, isLoading, isError } = usePagination(apiUser, columns)
    const { handleAdd, handleEdit, handleDelete } = useCrud(apiUser, Form, selected)

    const handleChooser = () => {}

    return (
        <PageCard
            headerProps={{
                title: t('client.title'),
                subheader: t('client.subheader'),
                avatar: <UserIcon />,
            }}
            isLoading={isLoading}
            isError={isError}>
            <Toolbar onClickChooser={handleChooser}>
                <Button size='small' variant='contained' onClick={handleAdd} startIcon={<AddIcon />}>
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
            </Toolbar>

            <DataGrid {...control} rowHeight={70} />
        </PageCard>
    )
}

export default User
