import React from 'react';

//Control
import { muiDialog } from '@ebay/nice-modal-react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const FormDialog = ({ modal, title, children, actions, maxWidth = 'lg', fullWidth = false }) => {
    return (
        <Dialog maxWidth={maxWidth} {...muiDialog(modal)} fullWidth={fullWidth}>
            <DialogTitle id={`dialog-title-${title}`}>{title}</DialogTitle>
            <DialogContent dividers>{children}</DialogContent>
            {actions && <DialogActions>{actions}</DialogActions>}
        </Dialog>
    );
};

export default FormDialog;
