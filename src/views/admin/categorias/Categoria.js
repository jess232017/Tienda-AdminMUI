import React, {useState} from 'react';

import { show } from '@ebay/nice-modal-react';
import { Column } from 'devextreme-react/data-grid';

import PageCard from 'src/common/PageCard';
import Form from 'src/components/forms/FormCategoria';
import api from 'src/services/api/tasks/ApiCategoria';
import PageTable from 'src/components/tables/PageTable';
import MyToolbar, { item } from 'src/components/Toolbar';

//

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const Categoria = () => {
    const [selected, setSelected] = useState({})
    const { data, isLoading, isError} = api.obtener();

    const onClickAdd = () => show(Form, { title: 'Agregar Categoria', method: 'post', data: data, queryKey: 'Categoria' });
    const onClickEdit = () => show(Form, { title: 'Editar Categoria', method: 'put', data: data, queryKey: 'Categoria' });
    const onClickDelete = () => show(Form, { title: 'Eliminar Categoria', method: 'delete', data: data, queryKey: 'Categoria' });

    const myTools = [
        item("add", "Agregar", 'item', <AddIcon/>, onClickAdd),
        item("edit", "Editar", 'item', <EditIcon/>, onClickEdit),
        item("delete", "Eliminar", 'item', <DeleteIcon/>, onClickDelete),
    ]

    return (
        <PageCard
            icon="pi-tags"
            titulo = "Gestión de Categoria"
            subTitulo = "Listado de Categoria"
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
                <Column dataField="categoriaId"  key="categoriaId" width ={75}/>, 
                <Column dataField="imagen"  key="imagen" width ={90}/>, 
                <Column dataField="icono"  key="icono" width = {90}/>, 
                <Column dataField="nombre"  key="nombre" width={150}/>, 
                <Column dataField="descripcion"  key="descripcion"/>, 
                <Column dataField="porDefecto"  key="porDefecto" caption="Default"/>, 
            </PageTable>
        </PageCard>
    );
}

export default Categoria;