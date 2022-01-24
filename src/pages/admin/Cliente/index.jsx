import React, { useState, useRef } from 'react';

//controls
import { Button } from '@mui/material';
import { show } from '@ebay/nice-modal-react';
import { ColumnDirective, ColumnsDirective, ColumnChooser, Filter, GridComponent, Group, Inject, Sort, VirtualScroll } from '@syncfusion/ej2-react-grids';

//icons
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

//controls
import PageCard from '_@/common/PageCard';
import Toolbar from '_@/components/Toolbar';
import Form from '_@/components/forms/FormCliente';
import api from '_@/services/api/tasks/ApiCliente';

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
            icon="pi-user"
            titulo="Gestión de Cliente"
            subTitulo="Listado de Cliente"
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

            <GridComponent
                ref={grid}
                height='350'
                dataSource={data?.data}
                showColumnChooser={true}
                enableStickyHeader={true}
                enableVirtualization={true}
                enableColumnVirtualization={true}
                rowSelected={handleSelected}
            >
                <ColumnsDirective>
                    <ColumnDirective field='clienteId' headerText="clienteId" width='100' />
                    <ColumnDirective field='nombre' headerText="nombre" width='300' />
                    <ColumnDirective field='apellido' headerText="apellido" width='100' />
                    <ColumnDirective field='telefono' headerText="telefono QR" width='100' />
                    <ColumnDirective field='estado' headerText="estado" width='100' />
                    <ColumnDirective field='imagen' headerText="imagen" width='100' />
                    <ColumnDirective field='facturas' headerText="facturas" width='100' />
                </ColumnsDirective>

                <Inject services={[Sort, Filter, Group, VirtualScroll, ColumnChooser]} />
            </GridComponent>
        </PageCard>
    );
}

export default Cliente;
