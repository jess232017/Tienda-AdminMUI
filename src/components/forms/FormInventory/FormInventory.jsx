import React from 'react';

//control
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import NiceModal from '@ebay/nice-modal-react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

//Mui
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

//Owned
import FormDialog from '@/common/FormDialog';
import { Input, Select } from '@/common/control';

const FormInventario = NiceModal.create(({ method, data, title }) => {
    //validator
    const methods = useForm({
        shouldUnregister: true,
        resolver: yupResolver({}),
    });

    const onSubmit = (data) => console.log(data);

    return (
        <FormDialog title={`${title} inventario`} methods={methods} callback={methods.handleSubmit(onSubmit)}>
            <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} sm={6} md={8}>
                    <Select name="producto" label="Producto" />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Select name="motivo" label="Motivo" />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Input name="costoUnit" label="Costo Unitario" />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Input name="cantidad" label="Cantidad" />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Select name="estado" label="Estado" />
                </Grid>
                <Grid item xs={12} sm={6} md={8}>
                    <Input name="nota" label="Nota" />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Input name="fecha" label="Fecha" type="date" />
                </Grid>
                <Grid item xs={12}>
                    <Card variant="outlined">
                        <CardHeader title="Sistema" sx={{ p: 2 }} />
                        <CardContent sx={{ p: 2, pt: 0 }}>
                            <Grid container spacing={{ xs: 1, md: 2 }}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Input name="inventarioId" label="Inventario Id" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Input name="subTotal" label="SubTotal" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Input name="total" label="Total" />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </FormDialog>
    );
});

export default FormInventario;
