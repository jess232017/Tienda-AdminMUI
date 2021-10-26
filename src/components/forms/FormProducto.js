import React from 'react'
import FormDialog from 'src/common/FormDialog';
import {SimpleItem, GroupItem} from 'devextreme-react/form';

import NiceModal from '@ebay/nice-modal-react';
import AvatarRender from 'src/common/AvatarRender';

const FormProducto = NiceModal.create( ({title, method, data: source, queryKey}) =>{
    const callback = (data) =>{
        console.log(data);
    }

    return (
        <FormDialog
            title= {title}
            callback= {callback}
            data={source}
        >
             <GroupItem cssClass="first-group" colCount={4}>
                <GroupItem colSpan={3}>
                    <SimpleItem isRequired
                        dataField="descripcion">
                    </SimpleItem>
                    
                    <SimpleItem isRequired
                        dataField="categoriaId" />

                    <SimpleItem isRequired
                        dataField="marca"/>

                    <SimpleItem isRequired
                        dataField="codigoQr"/>

                    <SimpleItem 
                        dataField="precioVenta" 
                        itemType = "dxNumberBox"
                        isRequired/>
                </GroupItem>

                <GroupItem>
                    <SimpleItem isRequired
                        render={<AvatarRender/>}
                    />
                    <SimpleItem isRequired
                        dataField="productoId" 
                        editorOptions={{ disabled: true }}
                    />
                </GroupItem>
            </GroupItem>

            <GroupItem cssClass="second-group"
                caption="Información del Inventario"
                colCount={2}
            >
                <SimpleItem isRequired
                    dataField="cantidad"
                    itemType = "dxNumberBox"/>
                
                <SimpleItem isRequired
                    dataField="stockMinimo"
                    itemType = "dxNumberBox"/>
                    
                <SimpleItem dataField="inventariado" editorType="dxCheckBox" />
                <SimpleItem dataField="granel"  />
            </GroupItem>
        </FormDialog>
    )
});

export default FormProducto;