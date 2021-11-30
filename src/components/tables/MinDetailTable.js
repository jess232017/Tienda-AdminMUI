import React from 'react';
import DataGrid, { Scrolling, Column } from 'devextreme-react/data-grid';

import api from 'src/services/api/tasks/ApiFactura';

const MinDetailTable = ({facturaId}) => {
    const {data, isLoading, isError} = api.obtenerDetalle("/" + facturaId);
    const noDataText = isLoading ? "Cargando..." : isError ? "Hubo un error" : "No hay datos";
    const { data: detalle } = data || {};

    return ( 
        <DataGrid
            showBorders={true}
            columnAutoWidth={true}
            dataSource = {detalle}
            keyExpr = {"detalleId"}
            hoverStateEnabled={true}
            focusedRowEnabled={true}
            allowColumnResizing={true}
            columnHidingEnabled={true}
            allowColumnReordering={true}
            selection={{ mode: 'single' }}
            style = {{maxHeight : "20rem"}}
            noDataText={noDataText}
        >
            <Scrolling mode="virtual"/>
            <Column dataField="imagen" width="40" caption="Producto"/>
            <Column dataField="precio" width="20%" caption="Precio Unitario"/>
            <Column dataField="cantidad" width="20%" caption="Cantidad"/>
            <Column dataField="total" width="20%" caption="Total"/>
        </DataGrid>
    );
}
 /*
 
 th width="40%">Producto</th>
                                <th width="20%">Precio Unitario</th>
                                <th width="20%">Cantidad</th>
                                <th width="20%" className="text-end">Total</th>
 */
export default MinDetailTable;