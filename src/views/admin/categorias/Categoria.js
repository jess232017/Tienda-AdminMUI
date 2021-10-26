import React, {useState} from 'react';

import { Column, MasterDetail } from 'devextreme-react/data-grid';

import PageCard from 'src/common/PageCard';
import Form from 'src/components/forms/FormCategoria';
import api from 'src/services/api/tasks/ApiCategoria';
import PageTable, { itemDialog, itemTool } from 'src/components/tables/PageTable';

const Categoria = () => {
    const { data, isLoading, isError} = api.obtener();
    const [selected, setSelected] = useState({})

    const tools = [
        itemDialog("Agregar", "add", Form, "Agregar Categoria", "post", "categoriaId"),
        itemDialog("Editar", "edit", Form, "Editar Categoria", "put", "categoriaId", selected),
        itemDialog("Eliminar", "trash", Form, "Eliminar Categoria", "delete", "categoriaId", selected),
    ]

    console.log(data?.data);

    return (
        <PageCard
            icon="pi-tags"
            titulo = "Gestión de Categoria"
            subTitulo = "Listado de Categoria"
            isLoading={isLoading}
            isError={isError}
        >
            <PageTable
                data={data}
                tools={tools}
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