import React from 'react'
import FormDialog from 'src/common/FormDialog';
import {SimpleItem, GroupItem} from 'devextreme-react/form';

import NiceModal from '@ebay/nice-modal-react';

const FormCliente = NiceModal.create( ({title, method, data: source, queryKey}) =>{
    const callback = (data) =>{
        console.log(data);
    }

    return (
        <FormDialog
            title= {title}
            callback= {callback}
        >
            <GroupItem>
                <GroupItem cssClass="first-group" colCount={4}>
                    <GroupItem colSpan={3}>
                        <SimpleItem isRequired
                            dataField="Nombre">
                            
                        </SimpleItem>
                        <SimpleItem isRequired
                            dataField="Apellido" />
                        <SimpleItem isRequired
                            dataField="Telefono"/>
                    </GroupItem>

                    <GroupItem>
                        <SimpleItem dataField="ClienteId" 
                            editorOptions={{ disabled: true }}
                        />
                    </GroupItem>
                </GroupItem>
            </GroupItem>
        </FormDialog>
    )
});

export default FormCliente;