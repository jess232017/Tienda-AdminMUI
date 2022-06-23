import React from 'react';
import { useTranslation } from 'react-i18next';

// controls
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

// icons
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmarkTwoTone';

// owned
import PageCard from '@/common/PageCard';
import ProductTemplate from './ProductTemplate';
import Form from '@/components/forms/FormProduct/FormProduct';
import api from '@/api/tasks/ApiProduct';
import usePagination from '@/services/hooks/usePagination';
import useCrud from '@/services/hooks/useCrud';
import Toolbar from '@/components/Toolbar';

const columns = [
    //{ field: 'id', headerName: 'Codigo', width: 100 },
    { field: 'name', headerName: 'Nombre', width: 300, renderCell: ProductTemplate },
    //{ field: 'slug', headerName: 'Slug', width: 100 },
    //{ field: 'description', headerName: 'Descripcion', width: 200 },
    { field: 'category', headerName: 'Categoria', width: 100 },
    { field: 'brand', headerName: 'Marca', width: 100 },
    { field: 'isInventoriable', headerName: 'Inventariable', width: 100, type: 'boolean' },
    { field: 'stock', headerName: 'Stock', width: 100, type: 'number' },
    { field: 'safetyStock', headerName: 'Stock minimo', width: 100, type: 'number' },
    { field: 'price', headerName: 'Precio', width: 100, type: 'number' },
];

const Product = () => {
    const { t } = useTranslation();
    const { control, selected, isLoading, isError, rowCount } = usePagination(api, columns);
    const { handleAdd, handleEdit, handleDelete } = useCrud(api, Form, selected);

    const handlePrint = () => {};
    const handleChooser = () => {};
    //console.log('rowCount', rowCount);

    return (
        <PageCard
            headerProps={{
                title:  t('products.title'),
                subheader: t('products.subheader'),
                avatar: <CollectionsBookmarkIcon />,
            }}
            isLoading={isLoading}
            isError={isError}
        >
            <Toolbar onClickPrint={handlePrint} onClickChooser={handleChooser}>
                <Button variant="outlined" size="small" onClick={handleAdd} startIcon={<AddIcon />}>
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

            <DataGrid {...control} rowHeight={60} />
        </PageCard>
    );
};

export default Product;
