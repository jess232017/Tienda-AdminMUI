import React from 'react'
import FormDialog from 'src/common/FormDialog';
import {SimpleItem, GroupItem} from 'devextreme-react/form';

import NiceModal from '@ebay/nice-modal-react';

const FormProveedor = NiceModal.create( ({title, method, data: source, queryKey}) =>{
    const callback = (data) =>{
        console.log(data);
    }

    return (
        <FormDialog
            title= {title}
            callback= {callback}
        >
            <GroupItem cssClass="first-group" colCount={4}>                
                <GroupItem colSpan={3}>
                    <SimpleItem isRequired
                        dataField="Nombre">
                        
                    </SimpleItem>

                    <SimpleItem isRequired
                        dataField="Celular"/>

                    <SimpleItem
                        dataField="Estado" 
                        editorType="dxCheckBox"/>

                    <GroupItem cssClass="second-group mt-3"
                        caption="Informacion de la Empresa">

                        <SimpleItem isRequired
                            dataField="Nombre" />
                        <SimpleItem isRequired
                            dataField="Direccion" />

                    </GroupItem>
                </GroupItem>

                <GroupItem>
                    <SimpleItem dataField="ProveedorId"
                        editorOptions={{ disabled: true }} />
                </GroupItem>
            </GroupItem>
        </FormDialog>
    )
});

export default FormProveedor;