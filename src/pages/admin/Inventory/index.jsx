import React from 'react';

//controls
import { Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

//Icons
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import InventoryIcon from '@mui/icons-material/InventoryTwoTone';

//owned
import PageCard from '@/common/PageCard';
import Toolbar from '@/components/Toolbar';
import Form from '@/components/forms/FormInventory/FormInventory';
import api from '@/api/tasks/ApiInventory';
import usePagination from '@/services/hooks/usePagination';
import DropButton, { MenuItem } from '@/components/DropButton';
import useCrud from '@/services/hooks/useCrud';

const URL = import.meta.env.VITE_API_URL;

/*
id: "66a35b22-5fea-4e6c-24d7-08da4a522d9f"
loteId: "e91a05c3-94b4-4b2b-e708-08da4a522d94"
reason: "Agregado"
status: "Activo"
quantity: 12
unitPrice: 12
subTotal: 0
total: 144
note: "Agregado nuevo lote"
createdAt: "2022-06-09T19:56:43.8523358"
updatedAt: "2022-06-09T19:56:43.852434"
*/
const columns = [
    { field: 'id', headerName: 'Codigo', width: 100 },
    { field: 'loteId', headerName: 'Id Lote', width: 100 },
    { field: 'reason', headerName: 'Motivo', width: 100 },
    { field: 'createdAt', headerName: 'Fecha', width: 100 },
    { field: 'status', headerName: 'Estado', width: 100 },
    { field: 'quantity', headerName: 'Cantidad', width: 100 },
    { field: 'unitPrice', headerName: 'Costo Unitario', width: 100 },
    { field: 'subTotal', headerName: 'Sub Total', width: 100 },
    { field: 'total', headerName: 'Total', width: 100 },
    { field: 'note', headerName: 'Nota', width: 100 },
];

const Inventario = () => {
    const { control, data, selected, isLoading, isError } = usePagination(api, columns);
    const { handleAdd, handleEdit, handleDelete } = useCrud(api, Form, selected);

    const onClickExpiring = () => window.open(URL + '/reporte/productos/vence', '_blank').focus();
    const onClickExpired = () => window.open(URL + '/reporte/productos/vencido', '_blank').focus();

    const handleChooser = () => {};

    const handlePrint = () => {};

    return (
        <PageCard
            headerProps={{
                title: 'Gestión de inventarios',
                subheader: 'Listado de inventarios',
                avatar: <InventoryIcon />,
            }}
            isLoading={isLoading}
            isError={isError}
        >
            <Toolbar onClickChooser={handleChooser}>
                <Button variant="outlined" size="small" onClick={handleAdd} startIcon={<AddIcon />}>
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

                <DropButton id="reporte" title="reporte" startIcon={<AnalyticsIcon />}>
                    <MenuItem startIcon={<AnalyticsIcon />} onClick={onClickExpiring} children="Por vencer" />

                    <MenuItem startIcon={<AnalyticsIcon />} onClick={onClickExpired} children="Vencidos" />

                    <MenuItem startIcon={<AnalyticsIcon />} onClick={handlePrint} children="Imprimir" />
                </DropButton>
            </Toolbar>

            <DataGrid {...control} />
        </PageCard>
    );
};

export default Inventario;
