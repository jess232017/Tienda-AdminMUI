import React, {useState} from 'react';

import { show } from '@ebay/nice-modal-react';
import { Column } from 'devextreme-react/data-grid';

import PageCard from 'src/common/PageCard';
import Form from 'src/components/forms/FormProducto';
import api from 'src/services/api/tasks/ApiProducto';
import PageTable from 'src/components/tables/PageTable';
import MyToolbar, { item } from 'src/components/Toolbar';

//

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AnalyticsIcon from '@mui/icons-material/Analytics';

//
import { Avatar } from 'primereact/avatar';

const Producto = () => {
    const [selected, setSelected] = useState({})
    const { data, isLoading, isError} = api.obtener();

    const onClickAdd = () => show(Form, { title: 'Agregar Producto', method: 'post', data: data, queryKey: 'Producto' });
    const onClickEdit = () => show(Form, { title: 'Editar Producto', method: 'put', data: data, queryKey: 'Producto' });
    const onClickDelete = () => show(Form, { title: 'Eliminar Producto', method: 'delete', data: data, queryKey: 'Producto' });

    const myTools = [
        item("add", "Agregar", 'item', <AddIcon/>, onClickAdd),
        item("edit", "Editar", 'item', <EditIcon/>, onClickEdit),
        item("delete", "Eliminar", 'item', <DeleteIcon/>, onClickDelete),
    ]

    return (
        <PageCard
            icon="pi-briefcase"
            titulo = "Gestión de Producto"
            subTitulo = "Listado de Producto"
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
                <Column dataField="productoId"  key="productoId"  width={95}/>, 
                <Column caption="Descripcion" key="head-description">
                    <Column dataField="imagen"  key="imagen"  width={70}/>, 
                    <Column dataField="descripcion" caption="Nombre" key="descripcion" width={150}/>, 
                    <Column dataField="marca"  key="marca" width={140}/>, 
                    <Column dataField="codigoQR"  key="codigoQR" width={75}/>, 
                </Column>,
                <Column caption="Producto" key="head-inventary">
                    <Column dataField="categoria"  key="categoria" width={75}/>, 
                    <Column dataField="inventariado"  key="inventariado" width={95}/>, 
                    <Column dataField="stockMinimo"  key="stockMinimo" width={75}/>, 
                    <Column dataField="cantidad"  key="cantidad" width={75}/>, 
                    <Column dataField="granel"  key="granel" width={75}/>, 
                </Column>,
                <Column dataField="precioVenta"  key="precioVenta" width={95}/>, 
                <Column dataField="lotes"  key="lotes" width={75}/>, 
            </PageTable>
        </PageCard>
    );
}

function renderImage({value}) {
    //<img src={`data=image/jpeg;base64,${data}`} />
    return <div style={{width : "100%", textAlign: "center"}}>
        <Avatar image={`data=image/jpeg;base64,${value}`} imageAlt="..." style={{ backgroundColor: '#9c27b0', color: '#ffffff' }} />
    </div>
}
 
export default Producto;
