import React from 'react';
import { useTranslation } from 'react-i18next';
//controls
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

//Icons
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CategoryIcon from '@mui/icons-material/CategoryTwoTone';

//Owned
import PageCard from '@/common/PageCard';
import Form from '@/components/forms/FormCategory/FormCategory';
import api from '@/api/tasks/ApiCategory';
import usePagination from '@/services/hooks/usePagination';
import useCrud from '@/services/hooks/useCrud';
import Toolbar from '@/components/Toolbar';

const columns = [
    { field: 'id', headerName: 'Codigo', width: 280 },
    { field: 'name', headerName: 'Nombre', width: 150 },
    { field: 'description', headerName: 'Descripcion', flex: 1 },
    { field: 'byDefault', headerName: 'Defecto', width: 100, type: 'boolean' },
];

const Category = () => {
    const { t } = useTranslation();
    const { control, data, selected, isLoading, isError } = usePagination(api, columns);
    const { handleAdd, handleEdit, handleDelete } = useCrud(api, Form, selected);

    const handleChooser = () => {};

    return (
        <PageCard
            headerProps={{
                title:  t('category.title'),
                subheader: t('category.subheader'),
                avatar: <CategoryIcon />,
            }}
            isLoading={isLoading}
            isError={isError}
        >
            <Toolbar onClickChooser={handleChooser}>
                <Button size="small" variant="outlined" onClick={handleAdd} startIcon={<AddIcon />}>
                    {t('crud.add')}
                </Button>

                <Button
                    variant="outlined"
                    disabled={Object.entries(selected).length < 1}
                    size="small"
                    onClick={handleEdit}
                    startIcon={<EditIcon />}
                >
                    {t('crud.edit')}
                </Button>
                <Button
                    variant="outlined"
                    disabled={Object.entries(selected).length < 1}
                    size="small"
                    onClick={handleDelete}
                    startIcon={<DeleteIcon />}
                >
                    {t('crud.delete')}
                </Button>
            </Toolbar>

            <DataGrid {...control} />
        </PageCard>
    );
};

export default Category;
