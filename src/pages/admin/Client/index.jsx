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
import PageCard from '@/common/PageCard';
import Form from '@/components/forms/FormUser/FormUser';
import api from '@/api/tasks/ApiUser';
import usePagination from '@/services/hooks/usePagination';
import useCrud from '@/services/hooks/useCrud';
import Toolbar from '@/components/Toolbar';
import ClientTemplate from './ClientTemplate';

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
];

const User = () => {
    const { control, selected, isLoading, isError } = usePagination(api, columns);
    const { handleAdd, handleEdit, handleDelete } = useCrud(api, Form, selected);

    const handleChooser = () => {};

    return (
        <PageCard
            headerProps={{
                title: 'Gestión de Clientes',
                subheader: 'Listado de Clientes',
                avatar: <UserIcon />,
            }}
            isLoading={isLoading}
            isError={isError}
        >
            <Toolbar onClickChooser={handleChooser}>
                <Button size="small" variant="outlined" onClick={handleAdd} startIcon={<AddIcon />}>
                    Agregar
                </Button>

                <Button
                    variant="outlined"
                    disabled={Object.entries(selected).length < 1}
                    size="small"
                    onClick={handleEdit}
                    startIcon={<EditIcon />}
                >
                    Editar
                </Button>
                <Button
                    variant="outlined"
                    disabled={Object.entries(selected).length < 1}
                    size="small"
                    onClick={handleDelete}
                    startIcon={<DeleteIcon />}
                >
                    Eliminar
                </Button>
            </Toolbar>

            <DataGrid {...control} rowHeight={80} />
        </PageCard>
    );
};

export default User;
