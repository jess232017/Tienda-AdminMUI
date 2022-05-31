import React, { useState, useEffect } from 'react';

//control
import { useForm } from 'react-hook-form';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

//Mui
import Grid from '@mui/material/Grid';

//Owned
import FormDialog from '@/common/FormDialog';
import { Input, Select, TextArea } from '@/common/control';
import { apiProduct, apiLote } from '../../../api/tasks';

const optionReason = [
    {
        label: 'Baja',
        value: 0,
    },
    {
        label: 'Vendido',
        value: 1,
    },
    {
        label: 'Estraviado',
        value: 2,
    },
    {
        label: 'Agregado',
        value: 3,
    },
    {
        label: 'Devuelto',
        value: 4,
    },
];

const mapOption = (data) => {
    return data?.map(({ id, name }) => ({ label: name, value: id }));
};

const FormInventario = NiceModal.create(({ data, request, title }) => {
    //modal handle
    const modal = useModal();
    const [options, setOptions] = useState([]);
    const [optLotes, setOptLotes] = useState([]);
    const { data: products } = apiProduct.get(1, 100);
    const { data: lotes } = apiLote.get(1, 100);

    //validator
    const methods = useForm({
        shouldUnregister: true,
        resolver: yupResolver({}),
    });

    //Apis
    const { mutate } = request;

    useEffect(() => {
        if (products?.data) {
            const { data } = products;
            setOptions(mapOption(data));
        }
    }, [products]);

    useEffect(() => {
        if (lotes?.data) {
            const { data } = lotes;
            setOptLotes(mapOption(data));
        }
    }, [lotes]);

    const onSubmit = (data) => {
        mutate(data, {
            onSuccess: () => {
                methods.reset({});
                modal.hide();
            },
        });
    };

    return (
        <FormDialog title={`${title} inventario`} maxWidth="sm" methods={methods} callback={methods.handleSubmit(onSubmit)} modal={modal}>
            <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} sm={6} md={6}>
                    <Select name="producto" label="Producto" options={options} />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Select name="loteId" label="Lote*" options={optLotes} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Select name="reason" label="Motivo*" required options={optionReason} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Input name="status" label="Estado" />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Input name="UnitPrice" label="Costo Unitario" />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Input name="quantity" label="Cantidad" />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Input name="subTotal" label="SubTotal" />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Input name="total" label="Total" />
                </Grid>
                <Grid item xs={12} sm={6} md={8}>
                    <TextArea name="nota" label="Nota" />
                </Grid>
            </Grid>
        </FormDialog>
    );
});

export default FormInventario;
