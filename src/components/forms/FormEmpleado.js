import React from 'react'
import FormDialog from 'src/common/FormDialog';
import {SimpleItem, GroupItem} from 'devextreme-react/form';
import {EmailRule, RequiredRule, AsyncRule, } from 'devextreme-react/form';

import NiceModal from '@ebay/nice-modal-react';

const FormEmpleado = NiceModal.create( ({title, method, data: source, queryKey}) =>{
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
                        dataField="nombre">
                    </SimpleItem>
                    <SimpleItem isRequired
                        dataField="apellido" />
                    <SimpleItem isRequired
                        dataField="tienda"
                        editorType="dxSelectBox" />
                    <SimpleItem isRequired
                        dataField="rol"
                        editorType="dxSelectBox" />
                </GroupItem>

                <GroupItem>
                    <SimpleItem isRequired/>
                    <SimpleItem isRequired
                        dataField="empleadoId" 
                        editorOptions={{ disabled: true }}
                    />
                </GroupItem>
            </GroupItem>

            <GroupItem cssClass="second-group"
                caption="Información del Sistema"
                colCount={2}>

                <SimpleItem isRequired
                    dataField="usuario" />

                <SimpleItem isRequired
                    dataField="estado" />

                <SimpleItem
                    dataField="correo"
                    editorType="dxTextBox">
                    <RequiredRule message="Se requiere completar este campo" />
                    <EmailRule message="El correo no es valido" />
                    <AsyncRule
                        message="El correo ya se encuentra registrado"
                        validationCallback={ console.log} />
                </SimpleItem>
                
                <SimpleItem isRequired
                    dataField="clave"/>
            
            </GroupItem>
        </FormDialog>
    )
});

export default FormEmpleado;