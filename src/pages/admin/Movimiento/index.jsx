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
import Form from '_@/components/forms/FormMovimiento';
import api from '_@/services/api/tasks/ApiMovimiento';
import Toolbar from '_@/components/Toolbar';

const Movimiento = () => {
    const grid = useRef(null);
    const [selected, setSelected] = useState({})
    const { data, isLoading, isError } = api.obtener();

    const onClickAdd = () => show(Form, { title: 'Agregar Movimiento', method: 'post', data: selected, queryKey: 'Movimiento' });
    const onClickEdit = () => show(Form, { title: 'Editar Movimiento', method: 'put', data: selected, queryKey: 'Movimiento' });
    const onClickDelete = () => show(Form, { title: 'Eliminar Movimiento', method: 'delete', data: selected, queryKey: 'Movimiento' });

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
            icon="pi-book"
            titulo="Gestión de Movimiento"
            subTitulo="Listado de Movimiento"
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
                    <ColumnDirective field='movimientoId' headerText="movimientoId" width='100' />
                    <ColumnDirective field='empleadoId' headerText="empleadoId" width='300' />
                    <ColumnDirective field='estado' headerText="estado" width='100' />
                    <ColumnDirective field='fechaInicio' headerText="fechaInicio QR" width='100' />
                    <ColumnDirective field='fechaFin' headerText="fechaFin" width='100' />
                    <ColumnDirective field='dineroInicial' headerText="dineroInicial" width='100' />
                    <ColumnDirective field='dineroCierre' headerText="dineroCierre" width='100' />
                    <ColumnDirective field='saldo' headerText="saldo" width='100' />
                    <ColumnDirective field='diferencia' headerText="diferencia" width='100' />
                    <ColumnDirective field='Movimiento' headerText="Movimiento" width='100' />
                    <ColumnDirective field='empleado' headerText="empleado" width='100' />
                    <ColumnDirective field='contables' headerText="contables" width='100' />
                    <ColumnDirective field='Movimientos' headerText="Movimientos" width='100' />
                </ColumnsDirective>

                <Inject services={[Sort, Filter, Group, VirtualScroll, ColumnChooser]} />
            </GridComponent>
        </PageCard>
    );
}

export default Movimiento;