import React from 'react'

//control
import { useForm } from "react-hook-form";
import NiceModal from '@ebay/nice-modal-react';

//Mui
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

//Owned
import FormDialog from 'src/common/FormDialog';
import {Input, CheckBox, Select} from 'src/common/global/control/index';

const FormInventario = NiceModal.create( ({title, method, data: source, queryKey}) =>{
    const { handleSubmit, reset, control } = useForm();
    const onSubmit = (data) => console.log(data);


    return (
        <FormDialog
            title= {title}
            callback= {onSubmit}
            data = {source}
        >
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 2, sm: 4, md: 6}}>
                <Grid item xs={2} sm={4} md={4}>
                    <Select
                        name="producto"
                        label="Producto"
                        control = {control}
                    />
                </Grid>
                <Grid item xs={1} sm={2} md={2}>
                    <Input
                        name="motivo"
                        label="Motivo"
                        control = {control}
                    />
                </Grid>
                <Grid item xs={1} sm={2} md={2}>
                    <Input
                        name="costoUnit"
                        label="Costo Unitario"
                        control = {control}
                    />
                </Grid>
                <Grid item xs={1} sm={2} md={2}>
                    <Input
                        name="cantidad"
                        label="Cantidad"
                        control = {control}
                    />
                </Grid>
                <Grid item xs={1} sm={2} md={2}>
                    <Input
                        name="estado"
                        label="Estado"
                        control = {control}
                    />
                </Grid>
                <Grid item xs={2} sm={4} md={4}>
                    <Input
                        name="nota"
                        label="Nota"
                        control = {control}
                    />
                </Grid>
                <Grid item xs={1} sm={2} md={2}>
                    <Input
                        name="fecha"
                        label="Fecha"
                        type="date"
                        control = {control}
                    />
                </Grid>
                <Grid item xs={2} sm={4} md={6}>
                    <Card variant="outlined">
                        <CardHeader title="Sistema" sx={{pt: 2, pb: 0}}/>
                        <CardContent>
                            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 2, sm: 4, md: 6}}>
                                <Grid item xs={2} sm={4} md={3}>
                                    <Input
                                        name="inventarioId"
                                        label="Inventario Id"
                                        control = {control}
                                    />
                                </Grid>
                                <Grid item xs={2} sm={4} md={3}>
                                    <Input
                                        name="bitacoraId"
                                        label="Bitacora Id"
                                        control = {control}
                                    />
                                </Grid>
                                <Grid item xs={2} sm={4} md={3}>
                                    <Input
                                        name="subTotal"
                                        label="SubTotal"
                                        control = {control}
                                    />
                                </Grid>
                                <Grid item xs={2} sm={4} md={3}>
                                    <Input
                                        name="total"
                                        label="Total"
                                        control = {control}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            
        </FormDialog>
    )
});

export default FormInventario;
