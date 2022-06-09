import React from 'react';

//controls
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

//Icons
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import InventoryIcon from '@mui/icons-material/GifBoxTwoTone';

//owned
import PageCard from '@/common/PageCard';
import Toolbar from '@/components/Toolbar';
import Form from '@/components/forms/FormLote/FormLote';
import usePagination from '@/services/hooks/usePagination';
import DropButton, { MenuItem } from '@/components/DropButton';
import useCrud from '@/services/hooks/useCrud';
import { apiLote as api } from '../../../api/tasks/index';

const URL = import.meta.env.VITE_API_URL;

/*
id: "e91a05c3-94b4-4b2b-e708-08da4a522d94"
productId: "a594d4ec-45bf-4ece-3906-08da2eea2a2d"
product: "Centavitos"
supplierId: "dbc54468-dcf6-4417-e3a6-08da3868209b"
supplier: "Juan Lopez"
code: "SODLDF-2DK"
note: ""
quantity: 12
unitPrice: 12
totalPrice: 144
soldOut: false
expireAt: "2022-12-21T06:00:00"
createdAt: "2022-06-09T13:56:43.8505817"
modifiedAt: "0001-01-01T00:00:00"
*/
const columns = [
    { field: 'code', headerName: 'Codigo Lote', width: 100 },
    { field: 'product', headerName: 'Producto', width: 100 },
    { field: 'supplier', headerName: 'Proveedor', width: 100 },
    { field: 'createdAt', headerName: 'fecha', width: 100 },
    { field: 'expireAt', headerName: 'Expira el', width: 100 },
    { field: 'soldOut', headerName: 'Agotado', width: 100 },
    { field: 'quantity', headerName: 'Cantidad', width: 100 },
    { field: 'unitPrice', headerName: 'Precio Unidad', width: 100 },
    { field: 'totalPrice', headerName: 'Total', width: 100 },
    { field: 'note', headerName: 'Nota', width: 100 },
];

const Lote = () => {
    const { control, data, selected, isLoading, isError } = usePagination(api, columns);
    const { handleAdd, handleEdit, handleDelete } = useCrud(api, Form, selected);

    const onClickExpiring = () => window.open(URL + '/reporte/productos/vence', '_blank').focus();
    const onClickExpired = () => window.open(URL + '/reporte/productos/vencido', '_blank').focus();
    const handleChooser = () => {};
    const handlePrint = () => {};

    return (
        <PageCard
            headerProps={{
                title: 'Gestión de lotes',
                subheader: 'Listado de lotes',
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

export default Lote;
