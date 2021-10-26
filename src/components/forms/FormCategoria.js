import React from 'react'
import FormDialog from 'src/common/FormDialog';
import {SimpleItem, GroupItem} from 'devextreme-react/form';

import NiceModal from '@ebay/nice-modal-react';

const FormCategoria = NiceModal.create( ({title, method, data: source, queryKey}) =>{

    const callback = (data) =>{
        console.log(data);
    }

    const descripcionOptions = { height: 140 };

    return (
        <FormDialog
            title= {title}
            callback= {callback}
            data = {source}
        >
            <GroupItem cssClass="first-group" colCount={4}>
                <GroupItem colSpan={3}>
                    <SimpleItem isRequired
                        dataField="nombre">
                    </SimpleItem>
                    <SimpleItem isRequired
                        dataField="descripcion" />
                    <SimpleItem isRequired
                        dataField="icono"
                        editorType="dxSelectBox" />
                    <SimpleItem isRequired
                        dataField="porDefecto"
                        editorType="dxCheckBox" />
                </GroupItem>

                <GroupItem>
                    <SimpleItem isRequired/>
                    <SimpleItem isRequired
                        dataField="categoriaId"
                        editorOptions={{ disabled: true }}
                    />
                </GroupItem>
            </GroupItem>
        </FormDialog>
    )
});

export default FormCategoria;