import React from 'react'

import Grid from '@mui/material/Grid';
import { useForm } from "react-hook-form";
import NiceModal from '@ebay/nice-modal-react';
import Avatar from '@mui/material/Avatar'

//Owned
import FormDialog from 'src/common/FormDialog';
import {Input, Select} from 'src/common/global/control/index';

const FormCliente = NiceModal.create( ({title, method, data: source, queryKey}) =>{
    const { handleSubmit, reset, control } = useForm();
    const onSubmit = (data) => console.log(data);

    return (
        <FormDialog
            title= {title}
            callback= {onSubmit}
        >
            <Grid container spacing={{xs: 1, md: 2}} columns={{xs: 1, sm: 2, md: 3}}>
                <Grid item xs={1} sm={1} md={2}>
                    <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 2, sm: 4, md: 6}}>
                        <Grid item xs={2} sm={4} md={3}>
                            <Input
                                name="nombre"
                                label="Nombres"
                                control = {control}
                            />
                        </Grid>
                        <Grid item xs={1} sm={4} md={3}>
                            <Input
                                name="apellidos"
                                label="Apellidos"
                                control = {control}
                            />
                        </Grid>
                        <Grid item xs={1} sm={4} md={3}>
                            <Input
                                name="correo"
                                label="Correo"
                                control = {control}
                            />
                        </Grid>
                        <Grid item xs={1} sm={4} md={3}>
                            <Input
                                name="direccion"
                                label="Direccion"
                                control = {control}
                            />
                        </Grid>
                        <Grid item xs={1} sm={2} md={3}>
                            <Input
                                name="numero"
                                label="Telefono"
                                control = {control}
                            />
                        </Grid>
                        <Grid item sx={1} sm={2} md={3}>
                            <Select
                                name="SelectId"
                                label="Select"
                                control={control}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={1} sm={1} md={1}>

                    <Avatar variant="rounded" sx={{height: '250px', width: "100%", mb: 2}}/>

                    <Input
                        name="clienteId"
                        label="Cliente Id"
                        control = {control}
                    />
                </Grid>
            </Grid>
            
        </FormDialog>
    )
});

export default FormCliente;
