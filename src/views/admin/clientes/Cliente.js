import React, {useState} from 'react';

import { show } from '@ebay/nice-modal-react';
import { Column } from 'devextreme-react/data-grid';

import PageCard from 'src/common/PageCard';
import Form from 'src/components/forms/FormCliente';
import api from 'src/services/api/tasks/ApiCliente';
import PageTable from 'src/components/tables/PageTable';
import MyToolbar, { item } from 'src/components/Toolbar';

//

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const Cliente = () => {
    const [selected, setSelected] = useState({})
    const { data, isLoading, isError} = api.obtener();

    const onClickAdd = () => show(Form, { title: 'Agregar Cliente', method: 'post', data: data, queryKey: 'Cliente' });
    const onClickEdit = () => show(Form, { title: 'Editar Cliente', method: 'put', data: data, queryKey: 'Cliente' });
    const onClickDelete = () => show(Form, { title: 'Eliminar Cliente', method: 'delete', data: data, queryKey: 'Cliente' });

    const myTools = [
        item("add", "Agregar", 'item', <AddIcon/>, onClickAdd),
        item("edit", "Editar", 'item', <EditIcon/>, onClickEdit),
        item("delete", "Eliminar", 'item', <DeleteIcon/>, onClickDelete),
    ]

    return (
        <PageCard
            icon="pi-user"
            titulo = "Gestión de Cliente"
            subTitulo = "Listado de Cliente"
            isLoading={isLoading}
            isError={isError}
        >
            <MyToolbar
                items={myTools}
            />
        
            <PageTable
                data={data}
                isLoading={isLoading}
                setSelect={setSelected}
            >
                <Column dataField="clienteId"  key="clienteId" width ={75}/>, 
                <Column dataField="nombre"  key="nombre"/>, 
                <Column dataField="apellido"  key="apellido"/>, 
                <Column dataField="telefono"  key="telefono" width = {90}/>, 
                <Column dataField="estado"  key="estado"/>, 
                <Column dataField="imagen"  key="imagen"/>, 
                <Column dataField="facturas"  key="facturas"/>,
            </PageTable>
        </PageCard>
    );
}

export default Cliente;