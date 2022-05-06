import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextareaAutosize from '@mui/material/TextareaAutosize';

import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';

import useDialog from '@/services/hooks/useDialog';

const NewNote = ({ value, set }) => {
    const { handleOpen, handleClose, isOpen } = useDialog();

    const handleChange = (e) => {
        set({ note: e.target.value });
    };

    return (
        <>
            <Button fullWidth size="small" variant="outlined" onClick={handleOpen} endIcon={<CommentOutlinedIcon />}>
                Comentario (F9)
            </Button>
            <Dialog disableEscapeKeyDown open={isOpen} onClose={handleClose}>
                <DialogTitle>Agregar comentario</DialogTitle>
                <DialogContent>
                    <div className="input-style">
                        <TextareaAutosize
                            value={value.note}
                            onChange={handleChange}
                            aria-label="note textarea"
                            placeholder="Escriba su comentario aqui"
                            style={{ width: 300, height: 100 }}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Ok</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default NewNote;
