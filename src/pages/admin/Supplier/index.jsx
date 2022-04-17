import React from 'react';

//controls
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

//Icons
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TransportationIcon from '@mui/icons-material/EmojiTransportationTwoTone';

//Owned
import PageCard from '@/common/PageCard';
import api from '@/api/tasks/ApiSupplier';
import Form from '@/components/forms/FormSupplier/FormSupplier';
import usePagination from '@/services/hooks/usePagination';
import useCrud from '@/services/hooks/useCrud';
import Toolbar from '@/components/Toolbar';

const columns = [
    { field: 'id', headerName: 'Codigo', width: 100 },
    { field: 'name', headerName: 'Nombre', width: 150 },
    { field: 'description', headerName: 'Descripcion', width: 350 },
    { field: 'byDefault', headerName: 'Defecto', width: 100 },
];

const index = () => {
    const { control, data, selected, isLoading, isError } = usePagination(api, columns);
    const { handleAdd, handleEdit, handleDelete } = useCrud(api, Form, selected);

    const handleChooser = () => {};

    return (
        <PageCard
            headerProps={{
                title: 'Gestión de Proveedores',
                subheader: 'Listado de proveedores',
                avatar: <TransportationIcon />,
            }}
            isLoading={isLoading}
            isError={isError}
        >
            <Toolbar onClickChooser={handleChooser}>
                <Button size="small" variant="outlined" onClick={handleAdd} startIcon={<AddIcon />}>
                    Agregar
                </Button>

                <Button size="small" variant="outlined" onClick={handleEdit} startIcon={<EditIcon />}>
                    Editar
                </Button>
                <Button size="small" variant="outlined" onClick={handleDelete} startIcon={<DeleteIcon />}>
                    Eliminar
                </Button>
            </Toolbar>

            <DataGrid {...control} />
        </PageCard>
    );
};

export default index;
