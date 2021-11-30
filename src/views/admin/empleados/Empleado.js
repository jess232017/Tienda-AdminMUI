import React, {useState} from 'react';

import { show } from '@ebay/nice-modal-react';
import { Column } from 'devextreme-react/data-grid';

import PageCard from 'src/common/PageCard';
import Form from 'src/components/forms/FormEmpleado';
import api from 'src/services/api/tasks/ApiEmpleado';
import PageTable from 'src/components/tables/PageTable';
import MyToolbar, { item } from 'src/components/Toolbar';

//

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const Empleado = () => {
    const [selected, setSelected] = useState({})
    const { data, isLoading, isError} = api.obtener();

    const onClickAdd = () => show(Form, { title: 'Agregar Empleado', method: 'post', data: data, queryKey: 'Empleado' });
    const onClickEdit = () => show(Form, { title: 'Editar Empleado', method: 'put', data: data, queryKey: 'Empleado' });
    const onClickDelete = () => show(Form, { title: 'Eliminar Empleado', method: 'delete', data: data, queryKey: 'Empleado' });

    const myTools = [
        item("add", "Agregar", 'item', <AddIcon/>, onClickAdd),
        item("edit", "Editar", 'item', <EditIcon/>, onClickEdit),
        item("delete", "Eliminar", 'item', <DeleteIcon/>, onClickDelete),
    ]

    return (
        <PageCard
            icon="pi-user"
            titulo = "Gestión de Empleado"
            subTitulo = "Listado de Empleado"
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
                <Column dataField="empleadoId"  key="empleadoId" width={100}/>, 
                <Column dataField="tienda"  key="tienda" width={160}/>, 
                <Column dataField="rol"  key="rol" width={75}/>, 
                <Column dataField="nombres"  key="nombres" width={125}/>, 
                <Column dataField="apellidos"  key="apellidos" width={125}/>, 
                <Column dataField="usuario"  key="usuario" width={75}/>, 
                <Column dataField="clave"  key="clave" width={75}/>, 
                <Column dataField="foto"  key="foto" width={75}/>, 
                <Column dataField="estado"  key="estado" minWidth={75}/>, 
                <Column dataField="correo"  key="correo" width={185}/>, 
            </PageTable>
        </PageCard>
    );
}
 
export default Empleado;