import React, {useState} from 'react';

import { Column, MasterDetail } from 'devextreme-react/data-grid';

import PageCard from 'src/common/PageCard';
import Form from 'src/components/forms/FormProducto';
import api from 'src/services/api/tasks/ApiProducto';
import PageTable, { itemDialog, itemTool } from 'src/components/tables/PageTable';

//
import { Avatar } from 'primereact/avatar';

const Producto = () => {
    const { data, isLoading, isError} = api.obtener();
    const [selected, setSelected] = useState({})

    const tools = [
        itemDialog("Agregar", "add", Form, "Agregar Producto", "post", "productoId"),
        itemDialog("Editar", "edit", Form, "Editar Producto", "put", "productoId", selected),
        itemDialog("Eliminar", "trash", Form, "Eliminar Producto", "delete", "productoId", selected),
    ]

    return (
        <PageCard
            icon="pi-briefcase"
            titulo = "Gestión de Producto"
            subTitulo = "Listado de Producto"
            isLoading={isLoading}
            isError={isError}
        >
            <PageTable
                data={data}
                tools={tools}
                isLoading={isLoading}
                setSelect={setSelected}
            >
                <Column dataField="productoId"  key="productoId"  width={95}/>, 
                <Column caption="Descripcion" key="head-description">
                    <Column dataField="imagen"  key="imagen" cellRender = {renderImage} width={70}/>, 
                    <Column dataField="descripcion" caption="Nombre" key="descripcion" width={150}/>, 
                    <Column dataField="marca"  key="marca" width={140}/>, 
                    <Column dataField="codigoQR"  key="codigoQR" width={75}/>, 
                </Column>,
                <Column caption="Inventario" key="head-inventary">
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
