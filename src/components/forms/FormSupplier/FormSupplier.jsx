import React, { useEffect, useState } from 'react';

//control
import { useForm } from 'react-hook-form';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

//Mui
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import BusinessIcon from '@mui/icons-material/Business';

//Owned
import FormDialog from '@/common/FormDialog';
import { Input, Phone, CheckBox, Uploader } from '@/common/control';

const userSchema = Yup.object().shape({
    business: Yup.string()
        .required('El negocio es requerido')
        .min(3, 'El negocio debe tener al menos 3 caracteres')
        .max(30, 'El negocio no debe exceder los 30 caracteres'),
    firstName: Yup.string()
        .required('El nombre es requerido')
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(30, 'El nombre no debe exceder los 30 caracteres'),
    lastName: Yup.string()
        .required('El apellido es requerido')
        .min(3, 'El apellido debe tener al menos 3 caracteres')
        .max(30, 'El apellido no debe exceder los 30 caracteres'),
    address: Yup.string()
        .required('La direccion es requerido')
        .min(3, 'La direccion debe tener al menos 3 caracteres')
        .max(30, 'La direccion no debe exceder los 30 caracteres'),
    status: Yup.bool().required('El estado es requerido'),
    phoneNumber: Yup.string()
        .required('El telefono es requerido')
        .test('len', 'El telefono debe tener al menos 8 caracteres', (val) => val.length >= 8),
});

const FormSupplier = NiceModal.create(({ data, request, title }) => {
    //modal handle
    const modal = useModal();

    //validator
    const methods = useForm({
        shouldUnregister: true,
        resolver: yupResolver(userSchema),
    });

    //Apis
    const { mutate } = request;

    const onSubmit = (data) => {
        mutate(data, {
            onSuccess: () => {
                methods.reset({});
                modal.hide();
            },
        });
    };

    return (
        <FormDialog title={`${title} proveedor`} methods={methods} callback={methods.handleSubmit(onSubmit)} modal={modal}>
            <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} sm={12} md={8}>
                    <Grid container spacing={{ xs: 1, md: 2 }}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Input name="firstName" label="Nombre" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Input name="lastName" label="Apellido" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Phone name="businessPhone" label="Telefono" />
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12}>
                        <Card variant="outlined" sx={{ mt: { xs: 1, md: 2 } }}>
                            <CardHeader title="Empresa" sx={{ p: 2 }} />
                            <CardContent sx={{ p: 2, pt: 0 }}>
                                <Grid container spacing={{ xs: 1, md: 2 }}>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Input name="business" label="Nombre de la Empresa" startAdornment={<BusinessIcon />} />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Input name="address" label="Direccion" />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Phone name="businessPhone" label="Telefono de la empresa" />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <CheckBox name="status" label="Estado" />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={12} md={4}>
                    <Uploader name="image" />
                    <Input name="Id" label="Codigo" disabled />
                </Grid>
            </Grid>
        </FormDialog>
    );
});

export default FormSupplier;
