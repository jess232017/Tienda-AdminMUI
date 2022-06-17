import React from 'react';

//controls
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

//Icons
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWalletTwoTone';

//Owned
import PageCard from '@/common/PageCard';
import api from '@/api/tasks/ApiAccountant';
import Form from '@/components/forms/FormAccountant/FormAccountant';
import usePagination from '@/services/hooks/usePagination';
import useCrud from '@/services/hooks/useCrud';
import Toolbar from '@/components/Toolbar';

const columns = [
    { field: 'id', headerName: 'Codigo', width: 100 },
    { field: 'userId', headerName: 'ID Usuario', width: 120 },
    {
        field: 'type',
        headerName: 'Tipo',
        width: 100,
        valueFormatter: ({ value }) => (value === 0 ? 'Ingreso' : 'Egreso'),
    },
    { field: 'amount', headerName: 'Cantidad', width: 100 },
    { field: 'reason', headerName: 'Motivo', width: 150 },
    { field: 'note', headerName: 'Observacion', flex: 1 },
    {
        field: 'createdAt',
        headerName: 'Fecha de creacion',
        type: 'dateTime',
        width: 140,
        valueGetter: ({ value }) => value && new Date(value),
    },
];

const index = () => {
    const { control, data, selected, isLoading, isError } = usePagination(api, columns);
    const { handleAdd, handleEdit, handleDelete } = useCrud(api, Form, selected);

    const handleChooser = () => {};

    return (
        <PageCard
            headerProps={{
                title: 'Gestión Contable',
                subheader: 'Detalle de ingresos y egresos',
                avatar: <AccountBalanceWalletIcon />,
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
