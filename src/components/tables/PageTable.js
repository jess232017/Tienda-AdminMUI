import React from 'react';

import DataGrid, {
    Pager,
    Paging, Editing,
    Grouping, FilterRow,
    GroupPanel, SearchPanel, ColumnChooser } from 'devextreme-react/data-grid';
    
import { show } from '@ebay/nice-modal-react';

const PageTable = ({tools, data, isLoading, setSelect, children}) => {
    const onToolbarPreparing = (e) =>{
        e.toolbarOptions.items.unshift(...tools);
    }

    const onSelectionChanged = ({ selectedRowsData }) =>{
        setSelect(selectedRowsData[0]);
    }

    return ( 
        <DataGrid
            width = "100%"
            id="gridContainer"
            showBorders={true}
            columnAutoWidth={true}
            hoverStateEnabled={true}
            focusedRowEnabled={true}
            errorRowEnabled = {false}
            allowColumnResizing={true}
            rowAlternationEnabled={true}
            columnHidingEnabled={true}
            allowColumnReordering={true}
            selection={{ mode: 'single' }}
            onSelectionChanged={onSelectionChanged}
            onToolbarPreparing = {onToolbarPreparing}
            dataSource = {data?.data}
            noDataText = {(isLoading) ? "Cargando..." : "No se encontraron resultados"}>
                
            <FilterRow visible={false} />

            <ColumnChooser enabled={true}
                title="Selector de Columna"
                emptyPanelText="Arrastre una columna aqui para ocultarla"
                allowSearch={true}/>
            
            <Grouping contextMenuEnabled={true} expandMode="rowClick" />
            <Editing  allowAdding={false} allowUpdating={false} mode="batch" />
            <GroupPanel visible={false} emptyPanelText="Utilice el menú contextual de las columnas de encabezado para agrupar datos" />
            
            <SearchPanel 
                visible={true}
                placeholder="Buscar..."/>

            <Pager
                allowedPageSizes={[5, 8, 15, 30]}
                showInfo={false}
                showNavigationButtons={true}
                showPageSizeSelector={true}
                visible={true}/>

            <Paging 
                defaultPageSize={8} />

            {children}
        </DataGrid>
    );
}
 
const itemDialog = (text, icon, Template, title, method, queryKey, data) => ({
    location: "before",
    widget: "dxButton",
    locateInMenu: "auto",
    options:{
        icon,
        text,
        type:"default",
        stylingMode: "outlined",
        onClick: () => show(Template, {title, method, data, queryKey}),
    }
});

const itemTool = ( text, icon, onClick ) => {
    return {
        location: "before",
        widget: "dxButton",
        locateInMenu: "auto",
        options:{
            icon,
            text,
            onClick,
            type:"default",
            stylingMode: "outlined"
        }
    }
}

export {itemDialog, itemTool};
export default PageTable;