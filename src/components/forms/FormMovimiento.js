import React from 'react'
import FormDialog from 'src/common/FormDialog';
import {SimpleItem, GroupItem} from 'devextreme-react/form';

import NiceModal from '@ebay/nice-modal-react';

const FormMovimiento = NiceModal.create( ({title, method, data: source, queryKey}) =>{
    const callback = (data) =>{
        console.log(data);
    }

    return (
        <FormDialog
            title= {title}
            data = {source}
            callback= {callback}
        >
            <GroupItem cssClass="first-group">
                <GroupItem colCount={2}>
                    <GroupItem>
                        <SimpleItem dataField="Producto"/>
                        {/*<SimpleItem dataField="Producto" 
                            editorType="dxSelectBox"
                            editorOptions = {{
                                placeholder : "Selecione...",
                                items : employeesList, 
                                searchEnabled: true,
                                value: ''
                            }}/>*/}
                        <SimpleItem dataField="Costo Unitario" 
                            editorType="dxNumberBox" />
                        <SimpleItem dataField="Cantidad" 
                            editorType="dxNumberBox" />
                    </GroupItem>
                    <GroupItem>
                        <SimpleItem dataField="Motivo" />
                        <SimpleItem dataField="Estado" />
                        <SimpleItem
                            dataField="Fecha"
                            editorType="dxDateBox"/>
                    </GroupItem>
                </GroupItem>
                <SimpleItem dataField="Nota" 
                    editorType="dxTextArea"/>

                <GroupItem cssClass="second-group mt-3"
                    caption="Info Adicional"
                    colCount={2}>
                    <SimpleItem
                        dataField="InventarioId"
                        editorOptions={{ disabled: true }}/>
                    <SimpleItem dataField="SubTotal" 
                        editorOptions={{ disabled: true }}/>
                    <SimpleItem dataField="EmpleadoId" 
                        editorOptions={{ disabled: true }}/>
                    <SimpleItem dataField="Total"
                        editorOptions={{ disabled: true }} />
                </GroupItem>
            </GroupItem>
        </FormDialog>
    )
});

export default FormMovimiento;