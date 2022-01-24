import React, { useState, useRef } from 'react';

//controls
import { show } from '@ebay/nice-modal-react';
import { Button } from '@mui/material';
import { ColumnDirective, ColumnsDirective, ColumnChooser, Filter, GridComponent, Group, Inject, Sort, VirtualScroll } from '@syncfusion/ej2-react-grids';

//icons
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

//owned
import PageCard from '_@/common/PageCard';
import Form from '_@/components/forms/FormProveedor';
import api from '_@/services/api/tasks/ApiProveedor';
import Toolbar from '_@/components/Toolbar';

const Proveedor = () => {
    const grid = useRef(null);
    const [selected, setSelected] = useState({})
    const { data, isLoading, isError } = api.obtener();

    const onClickAdd = () => show(Form, { title: 'Agregar Proveedor', method: 'post', data: selected, queryKey: 'Proveedor' });
    const onClickEdit = () => show(Form, { title: 'Editar Proveedor', method: 'put', data: selected, queryKey: 'Proveedor' });
    const onClickDelete = () => show(Form, { title: 'Eliminar Proveedor', method: 'delete', data: selected, queryKey: 'Proveedor' });

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
            titulo="Gestión de Proveedor"
            subTitulo="Listado de Proveedor"
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
                    <ColumnDirective field='proveedorId' headerText="proveedorId" width='100' />
                    <ColumnDirective field='empresa' headerText="empresa" width='300' />
                    <ColumnDirective field='contacto' headerText="contacto" width='100' />
                    <ColumnDirective field='direccion' headerText="direccion" width='100' />
                    <ColumnDirective field='estado' headerText="estado" width='100' />
                    <ColumnDirective field='celular' headerText="celular" width='100' />
                    <ColumnDirective field='foto' headerText="foto" width='100' />
                    <ColumnDirective field='lotes' headerText="lotes" width='100' />
                </ColumnsDirective>

                <Inject services={[Sort, Filter, Group, VirtualScroll, ColumnChooser]} />
            </GridComponent>
        </PageCard>
    );
}
export default Proveedor;
