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
import { Input, Select, TextArea, CheckBox } from '@/common/control';
import { apiProduct, apiLote } from '../../../api/tasks';

// supplierId quantity  unitPrice  totalPrice  code  expireAt  note soldOut
const validationSchema = Yup.object().shape({
    reason: Yup.object({
        value: Yup.string().required('El id del proveedor es requerido'),
    })
        .typeError('Debe definir el inventario')
        .required('El inventario es requerido'),
    quantity: Yup.number()
        .typeError('El precio deber ser de tipo numero')
        .required('El precio de venta es requerido')
        .positive('El precio debe ser positivo'),
    unitPrice: Yup.number()
        .typeError('El precio deber ser de tipo numero')
        .required('El precio de venta es requerido')
        .positive('El precio debe ser positivo'),
    /*totalPrice: Yup.number()
        .typeError('El precio deber ser de tipo numero')
        .required('El precio de venta es requerido')
        .positive('El precio debe ser positivo'),*/
    /*subTotal: Yup.string()
        .required('El codigo de lote es requerido')
        .min(3, 'El codigo de lote debe tener al menos 3 caracteres')
        .max(10, 'El codigo de lote no debe exceder los 10 caracteres'),*/
    note: Yup.string().notRequired(),
    soldOut: Yup.bool().notRequired(),
});

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
        label: 'Devuelto',
        value: 3,
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
        resolver: yupResolver(validationSchema),
    });
    const watchQuantity = methods.watch('quantity', '');
    const watchUnitPrice = methods.watch('unitPrice', '');
    methods.setValue('total', watchUnitPrice * watchQuantity);
    methods.setValue('subTotal', watchUnitPrice * watchQuantity);

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
            const aux = data?.map(({ id, product, code }) => ({ label: `${product} - ${code}`, value: id }));
            setOptLotes(aux);
        }
    }, [lotes]);

    useEffect(() => {
        const defaultValues = {
            reason: data?.reason || [],
            quantity: data?.quantity || '',
            unitPrice: data?.unitPrice || '',
            subTotal: data?.subTotal || '',
            total: data?.total || '',
            note: data?.note || '',
        };
        methods.reset(defaultValues);
    }, [data]);

    const onSubmit = (data) => {
        const loteId = data.loteId.value;
        const reason = parseInt(data.reason.value);
        console.log({ ...data, reason, loteId });
        mutate(
            { ...data, reason, loteId },
            {
                onSuccess: () => {
                    methods.reset({});
                    modal.hide();
                },
            }
        );
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
                {/* <Grid item xs={12} sm={6} md={4}>
                    <Input name="status" label="Estado" />
                </Grid> */}
                <Grid item xs={12} sm={6} md={4}>
                    <Input name="unitPrice" type="number" label="Costo Unitario" />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Input name="quantity" type="number" label="Cantidad" />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Input name="subTotal" type="number" label="SubTotal" disabled />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Input name="total" type="number" label="Total" disabled />
                </Grid>
                <Grid item xs={12} sm={6} md={8}>
                    <TextArea name="note" label="Nota" />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <CheckBox name="status" label="Estado" />
                </Grid>
            </Grid>
        </FormDialog>
    );
});

export default FormInventario;
