import React, { useState, useEffect } from 'react';

//control
import { useForm } from 'react-hook-form';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import {useAuthUser} from 'react-auth-kit'

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

//Mui
import Grid from '@mui/material/Grid';

//Owned
import { uploadImage } from '@/api';
import FormDialog from '@/common/FormDialog';
import { Input, Select, Uploader, TextArea, CheckBox } from '@/common/control';


const validationSchema = Yup.object().shape({
    amount: Yup.number()
        .required('El importe es requerido')
        .typeError('El importe deber ser de tipo numero'),
    reason: Yup.string()
        .required('el motivo es requerido')
        .min(6, 'el motivo debe tener al menos 6 caracteres')
        .max(120, 'el motivo no debe exceder los 120 caracteres'),
    note: Yup.string().notRequired(),
});

const optionType = [
    {
        label: 'Ingreso',
        value: 0,
    },
    {
        label: 'Egreso',
        value: 1,
    },
    
];

const mapOption = (data) => {
    return data?.map(({ id, name }) => ({ label: name, value: id }));
};

const FormProducto = NiceModal.create(({ data, request, title }) => {
    //modal handle
    const modal = useModal();

    const auth = useAuthUser()()
    console.log(auth)

    //validator
    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    //Apis
    const { mutate } = request;

    

    const onSubmit = async (data) => {
        const {value} = data?.type
        const final = { ...data, UserId: auth.userCode, type: value };
        console.log('final', final);

        mutate(final, {
            onSuccess: () => {
                methods.reset({});
                modal.hide();
            },
        });
    };

	    //reset inputs when data change
        useEffect(() => {
            const defaultValues = {
                amount: data?.amount || '',
                reason: data?.reason || '',
                type: data?.type || '',
                note: data?.note || '',
            };
            methods.reset(defaultValues);
        }, [data]);
    

        return (
            <FormDialog title={`${title} Contable`} methods={methods} callback={methods.handleSubmit(onSubmit)} modal={modal}>
                <Grid container spacing={{ xs: 1, md: 2 }}>
                    <Grid item xs={12} sm={12} md={9}>
                        <Grid container spacing={{ xs: 1, md: 2 }}>
                            <Grid item xs={12} sm={6}>
                                <Input required label="Importe*" name="amount" type="text" placeholder="Importe" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextArea
                                    required
                                    label="Motivo*"
                                    name="reason"
                                    type="text"
                                    placeholder="Escribe un breve motivo"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Select name="type" label="Tipo*" required options={optionType} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextArea
                                    required
                                    label="Nota*"
                                    name="note"
                                    type="text"
                                    placeholder="Escribe una nota breve"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
    
                    <Grid item xs={12} sm={12} md={3}>
                        <Input required label="Codigo" name="id" disabled />
                    </Grid>
                </Grid>
            </FormDialog>
        );
});

export default FormProducto;
