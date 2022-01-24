import React, { useState, useRef } from 'react';

//controls
import { Button } from '@mui/material';
import { Avatar, Box } from '@mui/material';
import { show } from '@ebay/nice-modal-react';
import { ColumnDirective, ColumnsDirective, ColumnChooser, Filter, GridComponent, Group, Inject, Sort, VirtualScroll } from '@syncfusion/ej2-react-grids';

//icons
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

//owned
import PageCard from '_@/common/PageCard';
import Form from '_@/components/forms/FormProducto';
import api from '_@/services/api/tasks/ApiProducto';
import Toolbar from '_@/components/Toolbar';

const imageTemplate = (data) => {
    const { imagen, descripcion } = data || "";
    return (
        <Box width="100%" display="flex" justifyContent="center">
            <Avatar alt={descripcion} src={`data:image/png;base64,${imagen}`} variant="rounded" />
        </Box>
    )
}

const Producto = () => {
    const grid = useRef(null);
    const [selected, setSelected] = useState({})
    const { data, isLoading, isError } = api.obtener();

    const onClickAdd = () => show(Form, { title: 'Agregar Producto', method: 'post', data: selected, queryKey: 'Producto' });
    const onClickEdit = () => show(Form, { title: 'Editar Producto', method: 'put', data: selected, queryKey: 'Producto' });
    const onClickDelete = () => show(Form, { title: 'Eliminar Producto', method: 'delete', data: selected, queryKey: 'Producto' });

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
            icon="pi-briefcase"
            titulo="Gestión de Producto"
            subTitulo="Listado de Producto"
            isLoading={isLoading}
            isError={isError}
        >
            <Toolbar
                onClickPrint={handlePrint}
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
                rowSelected={handleSelected}
            >
                <ColumnsDirective>
                    <ColumnDirective field='imagen' headerText="Imagen" width='100' template={imageTemplate} />
                    <ColumnDirective field='productoId' headerText="Codigo" width='100' />
                    <ColumnDirective field='descripcion' headerText="Descripcion" width='300' />
                    <ColumnDirective field='marca' headerText="Marca" width='100' />
                    <ColumnDirective field='codigoQR' headerText="Codigo QR" width='100' />
                    <ColumnDirective field='categoria' headerText="Categoria" width='100' />
                    <ColumnDirective field='inventariado' headerText="Inventariado" width='100' />
                    <ColumnDirective field='stockMinimo' headerText="Stock minimo" width='100' />
                    <ColumnDirective field='cantidad' headerText="Cantidad" width='100' />
                    <ColumnDirective field='granel' headerText="Granel" width='100' />
                    <ColumnDirective field='precioVenta' headerText="Precio venta" width='100' />
                    <ColumnDirective field='lotes' headerText="Lotes" width='100' />
                </ColumnsDirective>

                <Inject services={[Sort, Filter, Group, VirtualScroll, ColumnChooser]} />
            </GridComponent>

        </PageCard>
    );
}

export default Producto;
