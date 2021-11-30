import React from 'react'

import Grid from '@mui/material/Grid';
import { useForm } from "react-hook-form";
import NiceModal from '@ebay/nice-modal-react';

//Owned
import FormDialog from 'src/common/FormDialog';
import { Input, CheckBox } from 'src/common/global/control/index';

const FormCaja = NiceModal.create(({ title, method, data: source, queryKey }) => {
    const { handleSubmit, reset, control } = useForm();
    const onSubmit = (data) => console.log(data);


    return (
        <FormDialog
            title={title}
            callback={handleSubmit(onSubmit)}
        >
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 2, sm: 4, md: 6 }}>
                <Grid item xs={2} sm={4} md={4}>
                    <Input
                        name="descripcion"
                        label="Descripcion"
                        control={control}
                    />
                </Grid>
                <Grid item xs={1} sm={2} md={2}>
                    <Input
                        name="cajaId"
                        label="Caja Id"
                        control={control}
                    />
                </Grid>
                <Grid item xs={1} sm={2} md={2}>
                    <Input
                        name="serialPC"
                        label="Serial PC"
                        control={control}
                    />
                </Grid>
                <Grid item xs={1} sm={2} md={2}>
                    <Input
                        name="impresoraTicket"
                        label="Impresora Ticket"
                        control={control}
                    />
                </Grid>
                <Grid item xs={1} sm={2} md={2}>
                    <Input
                        name="impresoraA4"
                        label="Impresora A4"
                        control={control}
                    />
                </Grid>
                <Grid item xs={1} sm={2} md={2}>
                    <CheckBox
                        name="estado"
                        label="Estado"
                        control={control}
                    />
                </Grid>
            </Grid>
        </FormDialog>
    )
});

export default FormCaja;
