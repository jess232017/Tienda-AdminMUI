import React, {useState} from 'react';

import { Column, MasterDetail } from 'devextreme-react/data-grid';

import PageCard from 'src/common/PageCard';
import Form from 'src/components/forms/FormInventario';
import api from 'src/services/api/tasks/ApiInventario';
import PageTable, { itemDialog, itemTool } from 'src/components/tables/PageTable';


const Inventario = () => {
    const { data: Inventario, isLoading, isError} = api.obtener();
    const [data, setData] = useState({});

    const tools = [
        itemDialog("Agregar", "add", Form, "Agregar Inventario", "post", "InventarioId"),
        itemDialog("Editar", "edit", Form, "Editar Inventario", "put", "InventarioId", data),
        itemDialog("Eliminar", "trash", Form, "Eliminar Inventario", "delete", "InventarioId", data),
    ];

    return (
        <PageCard
            icon="pi-credit-card"
            titulo="Gestión de Inventario"
            subTitulo="Listado de Inventario"
            isLoading={isLoading}
            isError={isError}
        >
            <PageTable
                data={Inventario}
                tools={tools}
                isLoading={isLoading}
                setSelect={setData}
            >
                <Column dataField="inventarioId"  key="inventarioId" width ={100}/>
                <Column dataField="movimientoId"  key="movimientoId" width ={100}/> 
                <Column dataField="loteId"  key="loteId" width ={100}/>
                <Column dataField="motivo"  key="motivo"/>
                <Column dataField="fecha"  key="fecha"/>
                <Column dataField="estado"  key="estado" width ={60}/>
                <Column dataField="cantidad"  key="cantidad" width ={80}/>
                <Column dataField="costoUnit"  key="costoUnit" width ={80}/> 
                <Column dataField="subTotal"  key="subTotal" width ={80}/>
                <Column dataField="total"  key="total" width ={80}/>
                <Column dataField="nota"  key="nota" width ={80}/>
                <Column dataField="movimiento"  key="movimiento"/> 
                <Column dataField="lote"  key="lote"/>
            </PageTable>
        </PageCard>
    );
}
 
export default Inventario;  