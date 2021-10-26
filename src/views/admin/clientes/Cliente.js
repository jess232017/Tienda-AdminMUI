import React, {useState} from 'react';

import { Column, MasterDetail } from 'devextreme-react/data-grid';

import PageCard from 'src/common/PageCard';
import Form from 'src/components/forms/FormCliente';
import api from 'src/services/api/tasks/ApiCliente';
import PageTable, { itemDialog, itemTool } from 'src/components/tables/PageTable';

const Cliente = () => {
    const { data, isLoading, isError} = api.obtener();
    const [selected, setSelected] = useState({})

    const tools = [
        itemDialog("Agregar", "add", Form, "Agregar Cliente", "post", "clienteId"),
        itemDialog("Editar", "edit", Form, "Editar Cliente", "put", "clienteId", selected),
        itemDialog("Eliminar", "trash", Form, "Eliminar Cliente", "delete", "clienteId", selected),
    ]

    return (
        <PageCard
            icon="pi-user"
            titulo = "Gestión de Cliente"
            subTitulo = "Listado de Cliente"
            isLoading={isLoading}
            isError={isError}
        >
            <PageTable
                data={data}
                tools={tools}
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