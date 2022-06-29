import { useState } from 'react';

const useDialog = () => {
    const [isOpen, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = (_, reason) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };

    return {
        handleOpen,
        handleClose,
        isOpen
    }
};

export default useDialog;