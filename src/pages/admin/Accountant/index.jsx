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
import api from '@/api/tasks/ApiAccountant';
import Form from '@/components/forms/FormAccountant/FormAccountant';
import usePagination from '@/services/hooks/usePagination';
import useCrud from '@/services/hooks/useCrud';
import Toolbar from '@/components/Toolbar';
/*
"Id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "UserId": 0,
      "Amount": 0,
      "Reason": "string",
      "Type": 0,
      "Note": "string",
      "CreatedAt": "2022-06-03T02:20:07.082Z",
      "UpdatedAt": "2022-06-03T02:20:07.082Z"
*/
const columns = [
    { field: 'id', headerName: 'Codigo', width: 100 },
    { field: 'userId', headerName: 'ID Usuario', width: 100 },
    { field: 'amount', headerName: 'Cantidad', width: 100 },
    { field: 'reason', headerName: 'Motivo', width: 150 },
    { field: 'type', headerName: 'Ingreso(0) / Egreso(1)', width: 170 },
    { field: 'note', headerName: 'Observacion', width: 100 },
    { field: 'CreatedAt', headerName: 'Fecha de creacion', width: 140 },
    { field: 'UpdatedAt', headerName: 'Fecha de actualizacion', width: 140 },
];

const index = () => {
    const { control, data, selected, isLoading, isError } = usePagination(api, columns);
    const { handleAdd, handleEdit, handleDelete } = useCrud(api, Form, selected);

    const handleChooser = () => {};

    return (
        <PageCard
            headerProps={{
                title: 'Gestión  Contable',
                subheader: 'Detalle de ingresos y egresos',
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
