import React, { useState, useEffect } from 'react';

import NiceModal, { useModal } from '@ebay/nice-modal-react';

import Select from 'react-select';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import Dialog from '@/common/Dialog';
import { apiUser } from '../../../../api/tasks';

const SelectUser = NiceModal.create(({ client, setClient }) => {
    //modal handle
    const modal = useModal();
    const { data } = apiUser.get(1, 30);
    const [options, setOptions] = useState([]);
    const [auxClient, setAuxClient] = useState({});

    useEffect(() => {
        setOptions(
            data?.data?.map(({ id, firstName, lastName, image }) => {
                return { value: id, label: `${firstName} ${lastName}`, image };
            })
        );
    }, [data]);

    const handleOk = () => {
        setClient(auxClient);
        modal.hide();
    };

    const handleCancel = () => {
        setAuxClient({});
        modal.hide();
    };

    useEffect(() => {
        if (client !== auxClient) {
            setAuxClient(client);
        }
    }, [client]);

    console.log(auxClient);
    return (
        <Dialog
            title="Seleccionar usuario"
            maxWidth="xs"
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
            <Box width={250} display="flex" flexDirection="column" alignItems="center">
                <Avatar sx={{ width: 80, height: 80, mb: 2 }} src={auxClient?.image} alt={auxClient?.firstName} variant="rounded" />
                <Box width={250}>
                    <Select
                        isClearable
                        isSearchable
                        options={options}
                        menuPortalTarget={document.body}
                        menuShouldScrollIntoView={false}
                        value={auxClient}
                        onChange={setAuxClient}
                        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                    />
                </Box>
            </Box>
        </Dialog>
    );
});

export default SelectUser;
