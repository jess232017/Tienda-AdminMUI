import React from 'react';

//controls
import { show } from '@ebay/nice-modal-react';
import { Button } from '@mui/material';


//icons
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AnalyticsIcon from '@mui/icons-material/Analytics';

//own
import Form from '_@/components/forms/FormInventario';
import DropButton, { MenuItem } from '_@/components/DropButton';

const Toolbar = ({ selected }) => {

    const onClickAdd = () => show(Form, { title: 'Agregar Inventario', method: 'post', data: selected, queryKey: 'inventario' });
    const onClickEdit = () => show(Form, { title: 'Editar Inventario', method: 'put', data: selected, queryKey: 'inventario' });
    const onClickDelete = () => show(Form, { title: 'Eliminar Inventario', method: 'delete', data: selected, queryKey: 'inventario' });
    const onClickExpiring = () => window.open(URL + '/reporte/productos/vence', '_blank').focus();
    const onClickExpired = () => window.open(URL + '/reporte/productos/vencido', '_blank').focus();

    return (
        <Toolbar>
            <Button
                variant="outlined"
                size='small'
                onClick={onClickAdd}
                startIcon={<AddIcon />}
            >
                Agregar
            </Button>

            <Button
                variant="outlined"
                size='small'
                onClick={onClickEdit}
                startIcon={<EditIcon />}
            >
                Editar
            </Button>
            <Button
                variant="outlined"
                size='small'
                onClick={onClickDelete}
                startIcon={<DeleteIcon />}
            >
                Eliminar
            </Button>

            <DropButton
                id="reporte"
                title="reporte"
                startIcon={<AnalyticsIcon />}
            >
                <MenuItem
                    startIcon={<AnalyticsIcon />}
                    onClick={onClickExpiring}
                    children="Por vencer"
                />

                <MenuItem
                    startIcon={<AnalyticsIcon />}
                    onClick={onClickExpired}
                    children="Vencidos"
                />

                <MenuItem
                    startIcon={<AnalyticsIcon />}
                    onClick={onClickExpired}
                    children="Imprimir"
                />

            </DropButton>
        </Toolbar>
    );
}

export default Toolbar;
