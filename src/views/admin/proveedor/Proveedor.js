import React, {useState} from 'react';

import { Column, MasterDetail } from 'devextreme-react/data-grid';

import PageCard from 'src/common/PageCard';
import Form from 'src/components/forms/FormProveedor';
import api from 'src/services/api/tasks/ApiProveedor';
import PageTable, { itemDialog, itemTool } from 'src/components/tables/PageTable';

const Proveedor = () => {
    const { data, isLoading, isError} = api.obtener();
    const [selected, setSelected] = useState({})

    const tools = [
        itemDialog("Agregar", "add", Form, "Agregar Proveedor", "post", "proveedorId"),
        itemDialog("Editar", "edit", Form, "Editar Proveedor", "put", "proveedorId", selected),
        itemDialog("Eliminar", "trash", Form, "Eliminar Proveedor", "delete", "proveedorId", selected),
    ]

    return (
        <PageCard
            icon="pi-user"
            titulo = "Gestión de Proveedor"
            subTitulo = "Listado de Proveedor"
            isLoading={isLoading}
            isError={isError}
        >
            <PageTable
                data={data}
                tools={tools}
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