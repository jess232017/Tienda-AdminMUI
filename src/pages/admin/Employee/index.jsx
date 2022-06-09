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
import { apiEmployee } from '../../../api/tasks/index';
import Form from '@/components/forms/FormEmployee/FormEmployee';
import usePagination from '@/services/hooks/usePagination';
import useCrud from '@/services/hooks/useCrud';
import Toolbar from '@/components/Toolbar';
import ClientTemplate from '../Client/ClientTemplate';

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
    {
        field: 'roles',
        headerName: 'Roles',
        width: 150,
        renderCell: ({ row }) => {
            const { roles } = row || {};
            let stringRoles = '';
            roles.forEach(({ label }) => {
                stringRoles += label;
            });

            return <p>{stringRoles}</p>;
        },
    },
    { field: 'phoneNumber', headerName: 'Telefono', width: 100 },
    //{ field: 'email', headerName: 'Correo', width: 200 },
];

const Employee = () => {
    const { control, selected, isLoading, isError } = usePagination(apiEmployee, columns);
    const { handleAdd, handleEdit, handleDelete } = useCrud(apiEmployee, Form, selected);

    const handleChooser = () => {};

    return (
        <PageCard
            headerProps={{
                title: 'Gestión de Empleados',
                subheader: 'Listado de Empleados',
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

            <DataGrid {...control} rowHeight={70} />
        </PageCard>
    );
};

export default Employee;
