import React, {useState} from 'react';

import { show } from '@ebay/nice-modal-react';
import { Column } from 'devextreme-react/data-grid';

import PageCard from 'src/common/PageCard';
import Form from 'src/components/forms/FormCaja';
import api from 'src/services/api/tasks/ApiCaja';
import PageTable from 'src/components/tables/PageTable';
import MyToolbar, { item } from 'src/components/Toolbar';

//

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const Registro = () => {
    const [selected, setSelected] = useState({})
    const { data, isLoading, isError} = api.obtener();

    const onClickAdd = () => show(Form, { title: 'Agregar Registro', method: 'post', data: data, queryKey: 'Registro' });
    const onClickEdit = () => show(Form, { title: 'Editar Registro', method: 'put', data: data, queryKey: 'Registro' });
    const onClickDelete = () => show(Form, { title: 'Eliminar Registro', method: 'delete', data: data, queryKey: 'Registro' });

    const myTools = [
        item("add", "Agregar", 'item', <AddIcon/>, onClickAdd),
        item("edit", "Editar", 'item', <EditIcon/>, onClickEdit),
        item("delete", "Eliminar", 'item', <DeleteIcon/>, onClickDelete),
    ]

    return (
        <PageCard
            icon="pi-desktop"
            titulo = "Gestión de Registro"
            subTitulo = "Listado de Registro"
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
                <Column dataField="movimientosId"  key="movimientosId"/> 
                <Column dataField="descripcion"  key="descripcion"/> 
                <Column dataField="serial_PC"  key="serial_PC"/> 
                <Column dataField="impresora_Ticket"  key="impresora_Ticket"/> 
                <Column dataField="impresora_A4"  key="impresora_A4"/> 
                <Column dataField="estado"  key="estado"/> 
            </PageTable>
        </PageCard>
    );
}
 
export default Registro;