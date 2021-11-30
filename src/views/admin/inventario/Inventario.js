import React, {useState} from 'react';

import { show } from '@ebay/nice-modal-react';
import { Column } from 'devextreme-react/data-grid';

import PageCard from 'src/common/PageCard';
import Form from 'src/components/forms/FormInventario';
import api from 'src/services/api/tasks/ApiInventario';
import PageTable from 'src/components/tables/PageTable';
import MyToolbar, { item } from 'src/components/Toolbar';

//

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const URL = process.env.REACT_APP_API_URL;

const Inventario = () => {
    const [data, setData] = useState({});
    const { data: Inventario, isLoading, isError} = api.obtener();

    const onClickAdd = () => show(Form, { title: 'Agregar Inventario', method: 'post', data: data, queryKey: 'inventario' });
    const onClickEdit = () => show(Form, { title: 'Editar Inventario', method: 'put', data: data, queryKey: 'inventario' });
    const onClickDelete = () => show(Form, { title: 'Eliminar Inventario', method: 'delete', data: data, queryKey: 'inventario' });
    const onClickExpiring = () =>  window.open(URL + '/reporte/productos/vence', '_blank').focus();
    const onClickExpired = () =>  window.open(URL + '/reporte/productos/vencido', '_blank').focus();

    const myReports = [
        item("expiring", "Por vencer", 'group', <AnalyticsIcon/>, onClickExpiring),
        item("expired", "Vencidos", 'group', <AnalyticsIcon/>, onClickExpired),
        item("print", "Imprimir", 'group', <AnalyticsIcon/>, null),
    ]
    
    const myTools = [
        item("add", "Agregar", 'item', <AddIcon/>, onClickAdd),
        item("edit", "Editar", 'item', <EditIcon/>, onClickEdit),
        item("delete", "Eliminar", 'item', <DeleteIcon/>, onClickDelete),
        item("report", "Reporte", 'group', <AnalyticsIcon/>, myReports),
    ]

    return (
        <PageCard
            icon="pi-credit-card"
            titulo="Gestión de Inventario"
            subTitulo="Listado de Inventario"
            isLoading={isLoading}
            isError={isError}
        >
            <MyToolbar
                items={myTools}
            />

            <PageTable
                data={Inventario}
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