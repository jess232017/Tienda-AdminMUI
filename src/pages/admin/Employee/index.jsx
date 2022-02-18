import React, { useState, useRef } from 'react';

//controls
import { Button } from '@mui/material';
import { show } from '@ebay/nice-modal-react';

//icons
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BadgeIcon from '@mui/icons-material/BadgeTwoTone';

//controls
import PageCard from '_@/common/PageCard';
import Toolbar from '_@/components/Toolbar';
import Form from '_@/components/forms/FormEmpleado';
import api from '_@/services/api/tasks/ApiEmpleado';


const Empleado = () => {
    const grid = useRef(null);
    const [selected, setSelected] = useState({})
    const { data, isLoading, isError } = api.obtener();

    const onClickAdd = () => show(Form, { title: 'Agregar Empleado', method: 'post', data: selected, queryKey: 'Empleado' });
    const onClickEdit = () => show(Form, { title: 'Editar Empleado', method: 'put', data: selected, queryKey: 'Empleado' });
    const onClickDelete = () => show(Form, { title: 'Eliminar Empleado', method: 'delete', data: selected, queryKey: 'Empleado' });

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
                title: "Gestión de empleados",
                subheader: "Listado de empleados",
                avatar: <BadgeIcon />
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
           
                    <ColumnDirective field='empleadoId' headerText="empleadoId" width='100' />
                    <ColumnDirective field='tienda' headerText="tienda" width='300' />
                    <ColumnDirective field='rol' headerText="rol" width='100' />
                    <ColumnDirective field='nombres' headerText="nombres" width='100' />
                    <ColumnDirective field='apellidos' headerText="apellidos" width='100' />
                    <ColumnDirective field='usuario' headerText="usuario" width='100' />
                    <ColumnDirective field='foto' headerText="foto" width='100' />
                    <ColumnDirective field='estado' headerText="estado" width='100' />
                    <ColumnDirective field='correo' headerText="correo" width='100' />
           
           */}
        </PageCard>
    );
}

export default Empleado;
