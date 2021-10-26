import React from 'react';

import DataGrid, { Scrolling } from 'devextreme-react/data-grid';
import api from 'src/services/api/tasks/ApiFactura';


const DetalleTable = ({data}) => {
    const {data : parentData } = data;
    const { cliente, facturaId} = parentData;

    const { data: source, isLoading, isError } = api.obtenerDetalle("?facturaId="+ facturaId);

    console.log(cliente, source);
    
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
                noDataText={(isLoading) ? "Cargando...": "Error o no hay datos"}
            >
                <Scrolling mode="virtual" />
                
            </DataGrid>
        </React.Fragment>
    );
}
 
export default DetalleTable;