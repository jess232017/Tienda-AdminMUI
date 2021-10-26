import React from 'react'
import FormDialog from 'src/common/FormDialog';
import {SimpleItem, GroupItem} from 'devextreme-react/form';

import NiceModal from '@ebay/nice-modal-react';

const FormCaja = NiceModal.create( ({title, method, data: source, queryKey}) =>{

    const callback = (data) =>{
        console.log(data);
    }

    return (
        <FormDialog
            title= {title}
            callback= {callback}
            data = {source}
        >
            <GroupItem cssClass="first-group">
                <SimpleItem dataField="CajaId"
                    editorOptions={{ disabled: true }} />
                <GroupItem colCount={2}>
                    <SimpleItem isRequired
                        dataField="Descripcion" />
                    <SimpleItem dataField="SerialPC"/>
                    <SimpleItem dataField="Impresora Ticket"/>
                    <SimpleItem dataField="Impresora A4"/>
                    <SimpleItem dataField="Estado"
                        editorType="dxCheckBox"/>
                </GroupItem>
            </GroupItem>
        </FormDialog>
    )
});

export default FormCaja;