import React, { useState, useEffect } from 'react';

import Select from 'react-select';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';

import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import TextField from '@mui/material/TextField';

import api from '@/api/tasks/ApiUser';
import useDialog from '@/services/hooks/useDialog';

const options2 = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const CustonSpan = styled('span')({
    padding: 0,
    overflow: 'hidden',
    position: 'relative',
    display: 'inline-block',
    margin: '0 5px 0 5',
    textAlign: 'center',
    textDecoration: 'none',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
});

const DialogSelect = ({ value, set }) => {
    const { handleOpen, handleClose, isOpen } = useDialog();
    const { data } = api.get(1, 30);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        setOptions(
            data?.data?.map(({ id, firstName, lastName }) => {
                return { value: id, label: `${firstName} ${lastName}`, image: 'none' };
            })
        );
    }, [data]);

    const handleChange = (data) => {
        set(data);
    };

    return (
        <>
            <Button
                fullWidth
                size="small"
                variant="outlined"
                onClick={handleOpen}
                endIcon={value?.label != null ? <AssignmentIndIcon /> : <PersonAddAltIcon />}
            >
                {value?.label != null ? <CustonSpan>{value.label}</CustonSpan> : 'Cliente'} (F8)
            </Button>
            <Dialog disableEscapeKeyDown open={isOpen} onClose={handleClose}>
                <DialogTitle>Seleccionar usuario</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ display: 'flex', alignItems: 'center', m: 2 }}>
                        <Avatar sx={{ width: 80, height: 80, mr: 2 }} variant="rounded" />
                        <div style={{ width: 300 }}>
                            <Select
                                isClearable
                                isSearchable
                                options={options}
                                menuPortalTarget={document.body}
                                menuShouldScrollIntoView={false}
                                value={value}
                                onChange={handleChange}
                                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                            />
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Ok</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DialogSelect;
