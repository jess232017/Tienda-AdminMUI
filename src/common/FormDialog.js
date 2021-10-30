import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import { useModal } from '@ebay/nice-modal-react';

import { Button } from 'devextreme-react/button';
import Form, {ButtonItem , GroupItem} from 'devextreme-react/form';

import './formDialog.scss'

const FormDialog = ({title, callback, children, data = {}}) => {
    const modal = useModal();   

    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        callback(data);
    };

    return ( 
        <Dialog aria-labelledby="contained-modal-title-vcenter"
            open = {modal.visible} 
            onClose= {modal.hide}
            onExited = {modal.remove}
            maxWidth="md"
            fullWidth={true}>
        
            <div className="modal-header" style={{display: 'none'}}>
                <h5 className="modal-title">{title}</h5>
                <Button
                    icon="close"
                    type="normal"
                    stylingMode="text"
                    onClick={modal.hide}
                />
            </div>

            <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                <Button
                    icon="close"
                    type="normal"
                    stylingMode="text"
                    onClick={modal.hide}
                />
            </div>
            
            <form onSubmit = {handleSubmit}>
                <Form
                    formData={data}
                    requiredMessage={"El campo '{0}' es requerido"}
                >
                    <GroupItem cssClass="modal-body">
                        {children}
                    </GroupItem>
                    <GroupItem cssClass="modal-footer" colCount={2}>
                        <ButtonItem
                            buttonOptions= {{
                                icon: 'close',
                                text: 'Cancelar',
                                type: 'outlined',
                                onClick: modal.hide
                            }}
                        />
                        <ButtonItem 
                            buttonOptions= {{
                                icon: 'save',
                                text: 'Guardar ',
                                type: 'default',
                                useSubmitBehavior: true
                            }}
                        />
                    </GroupItem>
                </Form>
            </form>
        </Dialog>  
    );
}
 
export default FormDialog;
