import React, {useState} from 'react';

import { Column, MasterDetail } from 'devextreme-react/data-grid';

import PageCard from 'src/common/PageCard';
import Form from 'src/components/forms/FormCaja';
import api from 'src/services/api/tasks/ApiCaja';
import PageTable, { itemDialog, itemTool } from 'src/components/tables/PageTable';
import Breadcrumb from 'src/common/breadcrumb/Breadcrumb';

const Caja = () => {
    const { data, isLoading, isError} = api.obtener();
    const [selected, setSelected] = useState({})

    const tools = [
        itemDialog("Agregar", "add", Form, "Agregar Caja", "post", "cajaId"),
        itemDialog("Editar", "edit", Form, "Editar Caja", "put", "cajaId", selected),
        itemDialog("Eliminar", "trash", Form, "Eliminar Caja", "delete", "cajaId", selected),
    ]

    return (
        <>
            <Breadcrumb title="Cajas"/>

            <PageCard
                icon="pi-desktop"
                titulo = "Gestión de Caja"
                subTitulo = "Listado de Caja"
                isLoading={isLoading}
                isError={isError}
            >
                <PageTable
                    data={data}
                    tools={tools}
                    isLoading={isLoading}
                    setSelect={setSelected}
                >
                    <Column dataField="cajaId"  key="cajaId"/> 
                    <Column dataField="descripcion"  key="descripcion"/> 
                    <Column dataField="serial_PC"  key="serial_PC"/> 
                    <Column dataField="impresora_Ticket"  key="impresora_Ticket"/> 
                    <Column dataField="impresora_A4"  key="impresora_A4"/> 
                    <Column dataField="estado"  key="estado"/> 
                </PageTable>
            </PageCard>
        </>
    );
}
 
export default Caja;