import React, {useState} from 'react';

import { Column, MasterDetail } from 'devextreme-react/data-grid';

import PageCard from 'src/common/PageCard';
import Form from 'src/components/forms/FormMovimiento';
import api from 'src/services/api/tasks/ApiMovimiento';
import PageTable, { itemDialog, itemTool } from 'src/components/tables/PageTable';

const Movimiento = () => {
    const { data, isLoading, isError} = api.obtener();
    const [selected, setSelected] = useState({})

    const tools = [
        itemDialog("Agregar", "add", Form, "Agregar Movimiento", "post", "movimientoId"),
        itemDialog("Editar", "edit", Form, "Editar Movimiento", "put", "movimientoId", selected),
        itemDialog("Eliminar", "trash", Form, "Eliminar Movimiento", "delete", "movimientoId", selected),
    ]

    return (
        <PageCard
            icon="pi-book"
            titulo = "Gestión de Movimiento"
            subTitulo = "Listado de Movimiento"
            isLoading={isLoading}
            isError={isError}
        >
            <PageTable
                data={data}
                tools={tools}
                isLoading={isLoading}
                setSelect={setSelected}
            >
                <Column dataField="movimientoId"  key="movimientoId" width={105}/>, 
                <Column dataField="empleadoId"  key="empleadoId" width={95}/>, 
                <Column dataField="MovimientoId"  key="MovimientoId" width={75}/>, 
                <Column dataField="estado"  key="estado" width={75}/>, 
                <Column dataField="fechaInicio"  key="fechaInicio" width={105}/>, 
                <Column dataField="fechaFin"  key="fechaFin" width={105}/>, 
                <Column dataField="dineroInicial"  key="dineroInicial" width={90}/>, 
                <Column dataField="dineroCierre"  key="dineroCierre" width={90}/>, 
                <Column dataField="saldo"  key="saldo" width={75}/>, 
                <Column dataField="diferencia"  key="diferencia" width={75}/>, 
                <Column dataField="Movimiento"  key="Movimiento" width={75}/>, 
                <Column dataField="empleado"  key="empleado" width={75}/>, 
                <Column dataField="contables"  key="contables" width={75}/>, 
                <Column dataField="inventarios"  key="inventarios" width={75}/>,
            </PageTable>
        </PageCard>
    );
}
 
export default Movimiento;