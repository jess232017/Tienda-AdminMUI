import React, { useState, useEffect } from 'react';

import NiceModal, { useModal } from '@ebay/nice-modal-react';

import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';

import Dialog from '@/common/Dialog';

const NewNote = NiceModal.create(({ note, setNote }) => {
    //modal handle
    const modal = useModal();
    const [auxNote, setAuxNote] = useState('');

    const handleChange = (e) => {
        setAuxNote(e.target.value);
    };

    const handleOk = () => {
        setNote(auxNote);
        modal.hide();
    };

    const handleCancel = () => {
        setAuxNote('');
        modal.hide();
    };

    useEffect(() => {
        if (auxNote === note) {
            setAuxNote(note);
        }
    }, [note]);

    return (
        <Dialog
            title="Ingresar datos"
            maxWidth="lg"
            modal={modal}
            actions={
                <>
                    <Button onClick={handleCancel} color="error">
                        Cancelar
                    </Button>
                    <Button onClick={handleOk}>Ok</Button>
                </>
            }
        >
            <div className="input-style">
                <TextareaAutosize
                    value={auxNote}
                    onChange={handleChange}
                    aria-label="note textarea"
                    placeholder="Escriba su comentario aqui"
                    style={{ width: 300, height: 100 }}
                />
            </div>
        </Dialog>
    );
});

export default NewNote;
