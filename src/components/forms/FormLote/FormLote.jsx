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
import { apiSupplier, apiProduct } from '../../../api/tasks';
import { Input, Select, TextArea, CheckBox } from '@/common/control';

// supplierId quantity  unitPrice  totalPrice  code  expireAt  note soldOut
const validationSchema = Yup.object().shape({
    supplierId: Yup.object({
        value: Yup.string().required('El id del proveedor es requerido'),
    })
        .typeError('Debe definir el proveedor')
        .required('El proveedor es requerido'),
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
    code: Yup.string()
        .required('El codigo de lote es requerido')
        .min(3, 'El codigo de lote debe tener al menos 3 caracteres')
        .max(10, 'El codigo de lote no debe exceder los 10 caracteres'),
    expireAt: Yup.date().notRequired(),
    note: Yup.string().notRequired(),
    soldOut: Yup.bool().notRequired(),
});

const FormLote = NiceModal.create(({ data, request, title }) => {
    //modal handle
    const modal = useModal();

    //validator
    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });
    const watchQuantity = methods.watch('quantity', '');
    const watchUnitPrice = methods.watch('unitPrice', '');
    methods.setValue('totalPrice', watchUnitPrice * watchQuantity);

    //Apis
    const { mutate } = request;

    //get available categories
    const { data: products } = apiProduct.get(1, 100);
    const { data: suppliers } = apiSupplier.get(1, 100);

    const [options, setOptions] = useState([]);
    const [optSuppliers, setOptSuppliers] = useState([]);

    const mapOption = (data) => {
        return data?.map(({ id, name }) => ({ label: name, value: id }));
    };

    const onSubmit = async (data) => {
        // const image = data.image ? await uploadImage(data.image) : null;
        const {
            supplierId: { value: supplierId },
            productId: { value: productId },
        } = data;

        const final = { ...data, productId, supplierId };
        console.log('final', final);

        mutate(final, {
            onSuccess: () => {
                methods.reset({});
                modal.hide();
            },
        });
    };

    useEffect(() => {
        if (suppliers?.data) {
            const options = suppliers?.data.map(({ id, firstName, lastName, business }) => ({
                value: id,
                label: `${firstName} ${lastName} - ${business}`,
            }));
            setOptSuppliers(options);
        }
    }, [suppliers]);

    useEffect(() => {
        if (products?.data) {
            const options = mapOption(products?.data);
            setOptions(options);
        }
    }, [products]);

    //reset inputs when data change
    useEffect(() => {
        const defaultValues = {
            supplierId: data?.supplierId || [],
            quantity: data?.quantity || '',
            unitPrice: data?.unitPrice || '',
            totalPrice: data?.totalPrice || '',
            code: data?.code || '',
            expireAt: data?.expireAt || '',
            note: data?.note || '',
            soldOut: data?.soldOut || false,
        };
        methods.reset(defaultValues);
    }, [data]);

    return (
        <FormDialog title={`${title} Lote`} maxWidth="sm" methods={methods} callback={methods.handleSubmit(onSubmit)} modal={modal}>
            <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} sm={6}>
                    <Select name="productId" label="Producto*" options={options} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Select name="supplierId" label="Proveedor*" options={optSuppliers} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Input name="quantity" label="Cantidad*" type="number" required />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Input name="unitPrice" label="Costo Unitario*" type="number" required />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Input name="totalPrice" label="Precio Total" type="number" disabled />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Input name="code" label="Codigo de lote" />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Input name="expireAt" label="Expira el" type="date" />
                </Grid>
                <Grid item xs={12} sm={6} md={8}>
                    <TextArea name="note" label="Nota" />
                </Grid>
            </Grid>
            <CheckBox name="soldOut" label="Agotado" />
        </FormDialog>
    );
});

export default FormLote;
