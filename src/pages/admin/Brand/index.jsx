import React from 'react'
import { useTranslation } from 'react-i18next'

//controls
import { Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

//Icons
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import StarIcon from '@mui/icons-material/StarBorderTwoTone'

//Owned
import PageCard from '@/common/PageCard'
import api from '@/api/tasks/ApiBrand'
import Form from '@/components/forms/FormBrand/FormBrand'
import usePagination from '@/services/hooks/usePagination'
import useCrud from '@/services/hooks/useCrud'
import Toolbar from '@/components/Toolbar'

const columns = [
    { field: 'id', headerName: 'Codigo', width: 100 },
    { field: 'name', headerName: 'Nombre', width: 150 },
    { field: 'description', headerName: 'Descripcion', flex: 1 },
    { field: 'byDefault', headerName: 'Defecto', width: 100, type: 'boolean' },
]

const Brand = () => {
    const { t } = useTranslation()
    const { control, data, selected, isLoading, isError } = usePagination(api, columns)
    const { handleAdd, handleEdit, handleDelete } = useCrud(api, Form, selected)

    const handleChooser = () => {}

    return (
        <PageCard
            headerProps={{
                title: t('brand.title'),
                subheader: t('brand.subheader'),
                avatar: <StarIcon />,
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

            <DataGrid {...control} />
        </PageCard>
    )
}

export default Brand
