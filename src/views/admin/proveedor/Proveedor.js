import React, {useState} from 'react';

import { show } from '@ebay/nice-modal-react';
import { Column } from 'devextreme-react/data-grid';

import PageCard from 'src/common/PageCard';
import Form from 'src/components/forms/FormProveedor';
import api from 'src/services/api/tasks/ApiProveedor';
import PageTable from 'src/components/tables/PageTable';
import MyToolbar, { item } from 'src/components/Toolbar';

//

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const Proveedor = () => {
    const [selected, setSelected] = useState({})
    const { data, isLoading, isError} = api.obtener();

    const onClickAdd = () => show(Form, { title: 'Agregar Proveedor', method: 'post', data: data, queryKey: 'Proveedor' });
    const onClickEdit = () => show(Form, { title: 'Editar Proveedor', method: 'put', data: data, queryKey: 'Proveedor' });
    const onClickDelete = () => show(Form, { title: 'Eliminar Proveedor', method: 'delete', data: data, queryKey: 'Proveedor' });

    const myTools = [
        item("add", "Agregar", 'item', <AddIcon/>, onClickAdd),
        item("edit", "Editar", 'item', <EditIcon/>, onClickEdit),
        item("delete", "Eliminar", 'item', <DeleteIcon/>, onClickDelete),
    ]
    return (
        <PageCard
            icon="pi-user"
            titulo = "Gestión de Proveedor"
            subTitulo = "Listado de Proveedor"
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
                <Column dataField="proveedorId"  key="proveedorId" width={100}/>, 
                <Column dataField="empresa"  key="empresa" width={150}/>, 
                <Column dataField="contacto"  key="contacto" width={130}/>, 
                <Column dataField="direccion"  key="direccion" width={150}/>, 
                <Column dataField="estado"  key="estado" width={75}/>, 
                <Column dataField="celular"  key="celular" width={90}/>, 
                <Column dataField="foto"  key="foto" width={75}/>, 
                <Column dataField="lotes"  key="lotes" width={75}/>, 
            </PageTable>
        </PageCard>
    );
}
export default Proveedor;