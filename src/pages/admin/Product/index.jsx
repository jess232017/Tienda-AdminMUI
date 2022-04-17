import React from 'react';

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
    { field: 'id', headerName: 'Codigo', width: 100 },
    { field: 'slug', headerName: 'Slug', width: 100 },
    { field: 'name', headerName: 'Nombre', width: 120 },
    { field: 'description', headerName: 'Descripcion', width: 200 },
    { field: 'category', headerName: 'Categoria', width: 100 },
    { field: 'brand', headerName: 'Marca', width: 100 },
    { field: 'price', headerName: 'Precio', width: 100 },
    { field: 'stock', headerName: 'Stock', width: 100 },
    { field: 'isInventoriable', headerName: 'Inventariable', width: 100 },
    { field: 'safetyStock', headerName: 'Stock minimo', width: 100 },
];

const Product = () => {
    const { control, selected, isLoading, isError } = usePagination(api, columns);
    const { handleAdd, handleEdit, handleDelete } = useCrud(api, Form, selected);

    const handlePrint = () => {};
    const handleChooser = () => {};

    return (
        <PageCard
            headerProps={{
                title: 'Gestión de productos',
                subheader: 'Listado de productos',
                avatar: <CollectionsBookmarkIcon />,
            }}
            isLoading={isLoading}
            isError={isError}
        >
            <Toolbar onClickPrint={handlePrint} onClickChooser={handleChooser}>
                <Button variant="outlined" size="small" onClick={handleAdd} startIcon={<AddIcon />}>
                    Agregar
                </Button>
                {Object.entries(selected).length > 1 && (
                    <>
                        <Button variant="outlined" size="small" onClick={handleEdit} startIcon={<EditIcon />}>
                            Editar
                        </Button>
                        <Button variant="outlined" size="small" onClick={handleDelete} startIcon={<DeleteIcon />}>
                            Eliminar
                        </Button>
                    </>
                )}
            </Toolbar>

            <DataGrid {...control} />
        </PageCard>
    );
};

export default Product;
