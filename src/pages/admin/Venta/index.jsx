import React, { useState, useRef } from 'react';

//controls
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ColumnDirective, ColumnsDirective, ColumnChooser, Filter, GridComponent, Group, Inject, Sort, VirtualScroll } from '@syncfusion/ej2-react-grids';

//icons
import TimerIcon from '@mui/icons-material/Timer';
import UpdateIcon from '@mui/icons-material/Update';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import PageCard from '_@/common/PageCard';
import Toolbar from '_@/components/Toolbar';
import api from '_@/services/api/tasks/ApiFactura';

const Ventas = () => {
    const grid = useRef(null);
    const navigate = useNavigate();
    const [selected, setSelected] = useState({})
    const { data, isLoading, isError } = api.obtener();

    const onClickTomar = () => navigate("/admin/venta/nueva");
    const onClickDetail = () => navigate("/admin/venta/" + selected?.facturaId);
    const onClickDetail2 = () => console.log(selected);

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
            icon="pi-shopping-cart"
            titulo="Gestión de Ventas"
            subTitulo="Listado de Ventas"
            isLoading={isLoading}
            isError={isError}
        >
            <Toolbar
                onClickChooser={handleChooser}
            >
                <Button
                    variant="outlined"
                    size='small'
                    onClick={onClickTomar}
                    startIcon={<ShoppingCartIcon />}
                >
                    Tomar Venta
                </Button>

                <Button
                    variant="outlined"
                    size='small'
                    onClick={onClickDetail}
                    startIcon={<ReceiptIcon />}
                >
                    Ver Venta
                </Button>

                <Button
                    variant="outlined"
                    size='small'
                    onClick={onClickDetail2}
                    startIcon={<TimerIcon />}
                >
                    En Espera
                </Button>

                <Button
                    variant="outlined"
                    size='small'
                    onClick={onClickDetail2}
                    startIcon={<UpdateIcon />}
                >
                    Refrescar
                </Button>
            </Toolbar>

            <GridComponent
                ref={grid}
                height='350'
                dataSource={data?.data}
                showColumnChooser={true}
                enableStickyHeader={true}
                enableVirtualization={true}
                rowSelected={handleSelected}
            >
                <ColumnsDirective>
                    <ColumnDirective field='facturaId' headerText="Codigo" width='100' />
                    <ColumnDirective field='vendedor' headerText="Vendedor" width='100' />
                    <ColumnDirective field='cliente' headerText="Cliente" width='100' />
                    <ColumnDirective field='fechaVenta' headerText="Fecha de Venta" width='100' />
                    <ColumnDirective field='subTotal' headerText="Subtotal" width='100' />
                    <ColumnDirective field='pagoCon' headerText="Pago con" width='100' />
                    <ColumnDirective field='estado' headerText="Estado" width='100' />
                    <ColumnDirective field='comentario' headerText="Comentario" width='100' />
                </ColumnsDirective>

                <Inject services={[Sort, Filter, Group, VirtualScroll, ColumnChooser]} />
            </GridComponent>

        </PageCard>
    );
}

export default Ventas;
