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
import Form from '_@/components/forms/FormCaja';
import api from '_@/services/api/tasks/ApiCaja';
import Toolbar from '_@/components/Toolbar';

const Registro = () => {
    const grid = useRef(null);
    const [selected, setSelected] = useState({})
    const { data, isLoading, isError } = api.obtener();

    const onClickAdd = () => show(Form, { title: 'Agregar Caja', method: 'post', data: selected, queryKey: 'Caja' });
    const onClickEdit = () => show(Form, { title: 'Editar Caja', method: 'put', data: selected, queryKey: 'Caja' });
    const onClickDelete = () => show(Form, { title: 'Eliminar Caja', method: 'delete', data: selected, queryKey: 'Caja' });

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
            icon="pi-desktop"
            titulo="Gestión de Caja"
            subTitulo="Listado de Caja"
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
                    <ColumnDirective field='cajaId' headerText="Codigo" width='100' />
                    <ColumnDirective field='descripcion' headerText="Descripcion" width='300' />
                    <ColumnDirective field='serial_PC' headerText="serial_PC" width='100' />
                    <ColumnDirective field='impresora_Ticket' headerText="impresora_Ticket QR" width='100' />
                    <ColumnDirective field='impresora_A4' headerText="impresora_A4" width='100' />
                    <ColumnDirective field='estado' headerText="estado" width='100' />
                </ColumnsDirective>

                <Inject services={[Sort, Filter, Group, VirtualScroll, ColumnChooser]} />
            </GridComponent>
        </PageCard>
    );
}

export default Registro;
