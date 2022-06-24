import React from 'react';
import { useTranslation } from 'react-i18next';
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
import usePagination from '@/services/hooks/usePagination';
import DropButton, { MenuItem } from '@/components/DropButton';
import { apiSession } from '../../../api/tasks';

const URL = import.meta.env.VITE_API_URL;

/*
id: "abd43e99-b381-4e83-884c-4da3fb8b13a3"
status: "Activo"
balance: 0
createdAt: "2022-06-24T16:23:29.8486196"
finalBalance: 0
initialBalance: 0
userName: "Admin Admin"
name: null
*/
const columns = [
    { field: 'id', headerName: 'Codigo', width: 100 },
    { field: 'status', headerName: 'Estado', width: 100 },
    { field: 'ProviderDisplayName', headerName: 'Provider', width: 100 },
    { field: 'userName', headerName: 'Usuario', width: 100 },
    { field: 'name', headerName: 'Nombre', flex: 1 },
    { field: 'createdAt', headerName: 'Iniciado', type: 'dateTime', width: 150 },
    { field: 'LogoutAt', headerName: 'Finalizado', type: 'dateTime', width: 150 },
    { field: 'balance', headerName: 'Balance', width: 100 },
    { field: 'finalBalance', headerName: 'Balance Final', width: 100 },
];

const Session = () => {
    const { t } = useTranslation();
    const { control, isLoading, isError } = usePagination(apiSession, columns);

    const onClickExpiring = () => window.open(URL + '/reporte/productos/vence', '_blank').focus();
    const onClickExpired = () => window.open(URL + '/reporte/productos/vencido', '_blank').focus();
    const handleChooser = () => {};
    const handlePrint = () => {};

    return (
        <PageCard
            headerProps={{
                title: t('session.title'),
                subheader: t('session.subheader'),
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

                <DropButton id="reporte" title={t('session.report')} startIcon={<AnalyticsIcon />}>
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
