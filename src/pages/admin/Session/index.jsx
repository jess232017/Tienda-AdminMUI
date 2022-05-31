import React from 'react';

//controls
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

//Icons
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import MonitorIcon from '@mui/icons-material/MonitorTwoTone';

//owned
import PageCard from '@/common/PageCard';
import Toolbar from '@/components/Toolbar';
import Form from '@/components/forms/FormLote/FormLote';
import api from '@/api/tasks/ApiInventory';
import usePagination from '@/services/hooks/usePagination';
import DropButton, { MenuItem } from '@/components/DropButton';
import useCrud from '@/services/hooks/useCrud';

const URL = import.meta.env.VITE_API_URL;

const columns = [
    { field: 'id', headerName: 'Codigo', width: 100 },
    { field: 'movimientoId', headerName: 'Nombre', width: 300 },
    { field: 'loteId', headerName: 'Descripcion', width: 100 },
    { field: 'motivo', headerName: 'Defecto', width: 100 },
    { field: 'fecha', headerName: 'Defecto', width: 100 },
    { field: 'estado', headerName: 'Defecto', width: 100 },
    { field: 'cantidad', headerName: 'Defecto', width: 100 },
    { field: 'costoUnit', headerName: 'Defecto', width: 100 },
    { field: 'subTotal', headerName: 'Defecto', width: 100 },
    { field: 'total', headerName: 'Defecto', width: 100 },
    { field: 'nota', headerName: 'Defecto', width: 100 },
    { field: 'movimiento', headerName: 'Defecto', width: 100 },
    { field: 'session', headerName: 'Defecto', width: 100 },
];

const Session = () => {
    const { control, data, selected, isLoading, isError } = usePagination(api, columns);
    const { handleAdd, handleEdit, handleDelete } = useCrud(api, Form, selected);

    const onClickExpiring = () => window.open(URL + '/reporte/productos/vence', '_blank').focus();
    const onClickExpired = () => window.open(URL + '/reporte/productos/vencido', '_blank').focus();
    const handleChooser = () => {};
    const handlePrint = () => {};

    return (
        <PageCard
            headerProps={{
                title: 'Gestión de Sesiones',
                subheader: 'Listado de sesiones',
                avatar: <MonitorIcon />,
            }}
            isLoading={isLoading}
            isError={isError}
        >
            <Toolbar onClickChooser={handleChooser}>
                {/*<Button variant="outlined" size="small" onClick={handleAdd} startIcon={<AddIcon />}>
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
        </Button>*/}

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

export default Session;
