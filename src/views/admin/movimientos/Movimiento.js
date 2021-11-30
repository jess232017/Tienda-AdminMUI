import React, {useState} from 'react';

import { show } from '@ebay/nice-modal-react';
import { Column } from 'devextreme-react/data-grid';

import PageCard from 'src/common/PageCard';
import Form from 'src/components/forms/FormMovimiento';
import api from 'src/services/api/tasks/ApiMovimiento';
import PageTable from 'src/components/tables/PageTable';
import MyToolbar, { item } from 'src/components/Toolbar';

//

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const Movimiento = () => {
    const [selected, setSelected] = useState({})
    const { data, isLoading, isError} = api.obtener();

    const onClickAdd = () => show(Form, { title: 'Agregar Movimiento', method: 'post', data: data, queryKey: 'Movimiento' });
    const onClickEdit = () => show(Form, { title: 'Editar Movimiento', method: 'put', data: data, queryKey: 'Movimiento' });
    const onClickDelete = () => show(Form, { title: 'Eliminar Movimiento', method: 'delete', data: data, queryKey: 'Movimiento' });

    const myTools = [
        item("add", "Agregar", 'item', <AddIcon/>, onClickAdd),
        item("edit", "Editar", 'item', <EditIcon/>, onClickEdit),
        item("delete", "Eliminar", 'item', <DeleteIcon/>, onClickDelete),
    ]

    return (
        <PageCard
            icon="pi-book"
            titulo = "Gestión de Movimiento"
            subTitulo = "Listado de Movimiento"
            isLoading={isLoading}
            isError={isError}
        >
            <MyToolbar
                items={myTools}
            />
            
            <PageTable
                data={data}
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
                <Column dataField="Movimientos"  key="Movimientos" width={75}/>,
            </PageTable>
        </PageCard>
    );
}
 
export default Movimiento;