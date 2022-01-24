import React, { useState, useCallback, useRef } from 'react';

//controls
import { Button } from '@mui/material';
import { show } from '@ebay/nice-modal-react';
import { ColumnDirective, ColumnsDirective, ColumnChooser, Filter, GridComponent, Group, Inject, Sort, VirtualScroll } from '@syncfusion/ej2-react-grids';

//Icons
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

//Owned
import PageCard from '_@/common/PageCard';
import Form from '_@/components/forms/FormCategoria';
import api from '_@/services/api/tasks/ApiCategoria';
import Toolbar from '_@/components/Toolbar';


const Categoria = () => {
    const grid = useRef(null);
    const [selected, setSelected] = useState({})
    const { data, isLoading, isError } = api.obtener();

    const handleAdd = useCallback(() => {
        show(Form, { title: 'Agregar Categoria', method: 'post', data: selected, queryKey: 'Categoria' })
    }, [selected]);

    const handleEdit = useCallback(() => {
        show(Form, { title: 'Agregar Categoria', method: 'post', data: selected, queryKey: 'Categoria' })
    }, [selected]);

    const handleDelete = useCallback(() => {
        show(Form, { title: 'Agregar Categoria', method: 'post', data: selected, queryKey: 'Categoria' })
    }, [selected]);

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
            icon="pi-tags"
            titulo="Gestión de Categoria"
            subTitulo="Listado de Categoria"
            isLoading={isLoading}
            isError={isError}
        >

            <Toolbar
                onClickChooser={handleChooser}
            >
                <Button
                    variant="outlined"
                    size='small'
                    onClick={handleAdd}
                    startIcon={<AddIcon />}
                >
                    Agregar
                </Button>

                <Button
                    variant="outlined"
                    size='small'
                    onClick={handleEdit}
                    startIcon={<EditIcon />}
                >
                    Editar
                </Button>
                <Button
                    variant="outlined"
                    size='small'
                    onClick={handleDelete}
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
                    <ColumnDirective field='categoriaId' width='100' textAlign="Right" />
                    <ColumnDirective field='imagen' width='100' />
                    <ColumnDirective field='icono' width='100' textAlign="Right" />
                    <ColumnDirective field='nombre' width='100' format="C2" textAlign="Right" />
                    <ColumnDirective field='descripcion' width='100' />
                    <ColumnDirective field='porDefecto' width='100' />
                </ColumnsDirective>

                <Inject services={[Sort, Filter, Group, VirtualScroll, ColumnChooser]} />
            </GridComponent>

        </PageCard>
    );
}

export default Categoria;
