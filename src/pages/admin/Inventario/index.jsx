import React, { useState, useRef } from 'react';

//controls
import { show } from '@ebay/nice-modal-react';
import { Button } from '@mui/material';
import { ColumnDirective, ColumnsDirective, ColumnChooser, Filter, GridComponent, Group, Inject, Sort, VirtualScroll } from '@syncfusion/ej2-react-grids';

//icons
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AnalyticsIcon from '@mui/icons-material/Analytics';

//owned
import PageCard from '_@/common/PageCard';
import Toolbar from '_@/components/Toolbar';
import Form from '_@/components/forms/FormInventario';
import api from '_@/services/api/tasks/ApiInventario';
import DropButton, { MenuItem } from '_@/components/DropButton';

const URL = import.meta.env.VITE_API_URL;

const Inventario = () => {
    const grid = useRef(null);
    const [selected, setSelected] = useState({})
    const { data, isLoading, isError } = api.obtener();

    const onClickAdd = () => show(Form, { title: 'Agregar Inventario', method: 'post', data: selected, queryKey: 'inventario' });
    const onClickEdit = () => show(Form, { title: 'Editar Inventario', method: 'put', data: selected, queryKey: 'inventario' });
    const onClickDelete = () => show(Form, { title: 'Eliminar Inventario', method: 'delete', data: selected, queryKey: 'inventario' });
    const onClickExpiring = () => window.open(URL + '/reporte/productos/vence', '_blank').focus();
    const onClickExpired = () => window.open(URL + '/reporte/productos/vencido', '_blank').focus();


    const handleSelected = (e) => {
        if (e.data != null) {
            setSelected(e.data);
        }
    }

    const handleChooser = () => {
        grid.current.columnChooserModule.openColumnChooser();
    }

    const handlePrint = () => {
        grid.current.print();
    }

    return (
        <PageCard
            icon="pi-credit-card"
            titulo="Gestión de Inventario"
            subTitulo="Listado de Inventario"
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
                        onClick={handlePrint}
                        children="Imprimir"
                    />
                </DropButton>
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
                    <ColumnDirective field='inventarioId' headerText="inventarioId" width='100' />
                    <ColumnDirective field='movimientoId' headerText="movimientoId" width='300' />
                    <ColumnDirective field='loteId' headerText="loteId" width='100' />
                    <ColumnDirective field='motivo' headerText="motivo" width='100' />
                    <ColumnDirective field='fecha' headerText="fecha" width='100' />
                    <ColumnDirective field='estado' headerText="estado" width='100' />
                    <ColumnDirective field='cantidad' headerText="cantidad" width='100' />
                    <ColumnDirective field='costoUnit' headerText="costoUnit" width='100' />
                    <ColumnDirective field='subTotal' headerText="subTotal" width='100' />
                    <ColumnDirective field='total' headerText="total" width='100' />
                    <ColumnDirective field='nota' headerText="nota" width='100' />
                    <ColumnDirective field='movimiento' headerText="movimiento" width='100' />
                    <ColumnDirective field='lote' headerText="lote" width='100' />
                </ColumnsDirective>

                <Inject services={[Sort, Filter, Group, VirtualScroll, ColumnChooser]} />
            </GridComponent>
        </PageCard>
    );
}

export default Inventario;  
