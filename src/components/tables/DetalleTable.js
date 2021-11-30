import React from 'react';

import DataGrid, { Scrolling } from 'devextreme-react/data-grid';
import api from 'src/services/api/tasks/ApiFactura';


const DetalleTable = ({data}) => {
    const {data : { cliente, facturaId} } = data;
    const { data: source, isLoading, isError } = api.obtenerDetalle("/"+ facturaId);
    const noDataText = isLoading ? "Cargando..." : isError ? "Hubo un error" : "No hay datos";

    return ( 
        <React.Fragment>
            <div className="master-detail-caption">
                {`Productos vendidos a ${cliente}`}
            </div>
            <DataGrid
                style = {{maxHeight : "20rem"}}
                keyExpr = {"detalleId"}
                showBorders={true}
                dataSource = {source?.data}
                columnAutoWidth={true}
                hoverStateEnabled={true}
                focusedRowEnabled={true}
                allowColumnResizing={true}
                columnHidingEnabled={true}
                allowColumnReordering={true}
                selection={{ mode: 'single' }}
                noDataText={noDataText}
            >
                <Scrolling mode="virtual" />
                
            </DataGrid>
        </React.Fragment>
    );
}
 
export default DetalleTable;