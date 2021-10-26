import React, {useState} from 'react';

import { Column, MasterDetail } from 'devextreme-react/data-grid';

import PageCard from 'src/common/PageCard';
import Form from 'src/components/forms/FormEmpleado';
import api from 'src/services/api/tasks/ApiEmpleado';
import PageTable, { itemDialog, itemTool } from 'src/components/tables/PageTable';

const Empleado = () => {
    const { data, isLoading, isError} = api.obtener();
    const [selected, setSelected] = useState({})

    const tools = [
        itemDialog("Agregar", "add", Form, "Agregar Empleado", "post", "empleadoId"),
        itemDialog("Editar", "edit", Form, "Editar Empleado", "put", "empleadoId", selected),
        itemDialog("Eliminar", "trash", Form, "Eliminar Empleado", "delete", "empleadoId", selected),
    ]

    return (
        <PageCard
            icon="pi-user"
            titulo = "Gestión de Empleado"
            subTitulo = "Listado de Empleado"
            isLoading={isLoading}
            isError={isError}
        >
            <PageTable
                data={data}
                tools={tools}
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