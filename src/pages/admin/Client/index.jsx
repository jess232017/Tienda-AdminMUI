import React, { useState, useRef } from 'react';

//controls
import { Button } from '@mui/material';
import { show } from '@ebay/nice-modal-react';
import { Chip } from '@mui/material';

//icons
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from '@mui/icons-material/AccountCircleTwoTone';

//controls
import PageCard from '_@/common/PageCard';
import Toolbar from '_@/components/Toolbar';
import Form from '_@/components/forms/FormCliente';
import api from '_@/services/api/tasks/ApiCliente';

//own
import ClientTemplate from './ClientTemplate';

const statusTemplate = ({ estado }) => {
    return (
        <Chip label={estado ? "Activo" : "Inactivo"} color={estado ? "primary" : "secondary"} size="small" />
    )
}

const Cliente = () => {
    const grid = useRef(null);
    const [selected, setSelected] = useState({})
    const { data, isLoading, isError } = api.obtener();

    const onClickAdd = () => show(Form, { title: 'Agregar Cliente', method: 'post', data: selected, queryKey: 'Cliente' });
    const onClickEdit = () => show(Form, { title: 'Editar Cliente', method: 'put', data: selected, queryKey: 'Cliente' });
    const onClickDelete = () => show(Form, { title: 'Eliminar Cliente', method: 'delete', data: selected, queryKey: 'Cliente' });

    const handleSelected = (e) => {
        if (e.data != null) {
            setSelected(e.data);
        }
    }

    const handleChooser = () => {
        grid.current.columnChooserModule.openColumnChooser();
    }

    return (
        <PageCard
            headerProps={{
                title: "Gestión de clientes",
                subheader: "Listado de clientes",
                avatar: <AccountCircleIcon />
            }}
            isLoading={isLoading}
            isError={isError}
        >
            <Toolbar
                onClickChooser={handleChooser}
            >
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
            </Toolbar>
            {/*

<ColumnsDirective>
                    <ColumnDirective field='clienteId' headerText="Codigo" visible={false} width='100' />
                    <ColumnDirective field='imagen' headerText="Informacion" width='350' template={ClientTemplate} />
                    <ColumnDirective field='estado' headerText="Estado" width='100' template={statusTemplate} />
                    <ColumnDirective field='facturas' headerText="facturas" width='100' />
                </ColumnsDirective>
*/}
        </PageCard>
    );
}

export default Cliente;
