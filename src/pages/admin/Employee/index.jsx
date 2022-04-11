import React from 'react';

//controls
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

//Icons
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UserIcon from '@mui/icons-material/Person';

//Owned
import PageCard from '_@/common/PageCard';
import Form from '_@/components/forms/FormCategory';
import api from '_@/api/tasks/ApiUser';
import usePagination from '_@/services/hooks/usePagination';
import useCrud from '_@/services/hooks/useCrud';
import Toolbar from '_@/components/Toolbar';

const columns = [
    { field: 'id', headerName: 'Codigo', width: 280 },
    { field: 'firstName', headerName: 'Nombres', width: 150 },
    { field: 'lastName', headerName: 'Apellidos', width: 150 },
    { field: 'userName', headerName: 'Usuario', width: 100 },
    { field: 'email', headerName: 'Correo', width: 200 },
    { field: 'password', headerName: 'Contraseña', width: 100 },
];

const User = () => {
    const { control, selected, isLoading, isError } = usePagination(api, columns);
    const { handleAdd, handleEdit, handleDelete } = useCrud(api, Form, selected);

    const handleChooser = () => {};

    return (
        <PageCard
            headerProps={{
                title: 'Gestión de Usuarios',
                subheader: 'Listado de Usuarios',
                avatar: <UserIcon />,
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

export default User;
