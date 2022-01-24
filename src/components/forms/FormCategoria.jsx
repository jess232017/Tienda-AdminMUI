import React from 'react'

//control
import { useForm } from "react-hook-form";
import NiceModal from '@ebay/nice-modal-react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

//Mui
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar'

//Owned
import FormDialog from '_@/common/FormDialog';
import apiCategoria from '_@/services/api/tasks/ApiCategoria';
import { Input, CheckBox, Select } from '_@/common/global/control/index';

//nombre imagen icono descripcion porDefecto
const validationSchema = Yup.object().shape({
    nombre: Yup.string()
        .required('El nombre es requerido')
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(20, 'El nombre no debe exceder los 20 caracteres'),
    descripcion: Yup.string()
        .required('La descripcion es requerido')
        .min(3, 'La descripcion debe tener al menos 3 caracteres')
        .max(50, 'La descripcion no debe exceder los 20 caracteres'),
});

const FormCategoria = NiceModal.create(({ title, method, data: source, queryKey }) => {
    const { handleSubmit, formState: { errors }, control } = useForm({
        resolver: yupResolver(validationSchema),
    });

    //Apis
    const { isLoading, mutate } = apiCategoria.agregarCategoria();

    const onSubmit = (data) => {
        console.log(data)

        mutate(data, {
            onSuccess: (data) => {
                alert(JSON.stringify(data));
            },
            onError: (error) => {
                alert(JSON.stringify(error));
                //toast.current.show({severity:'error', summary: '', detail: error.mensaje});
            },
        });
    };


    console.log(source);

    return (
        <FormDialog
            title={title}
            processing={isLoading}
            callback={handleSubmit(onSubmit)}
        >
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 2, sm: 4, md: 6 }}>
                <Grid item xs={2} sm={4} md={4}>
                    <Input
                        name="nombre"
                        label="Nombre"
                        control={control}
                        helperText={errors.nombre?.message}
                        error={errors.nombre ? true : false}
                    />
                </Grid>
                <Grid item xs={1} sm={2} md={2}>
                    <Select
                        name="icono"
                        label="Icono"
                        control={control}
                        helperText={errors.icono?.message}
                        error={errors.icono ? true : false}
                    />
                </Grid>
                <Grid item xs={2} sm={4} md={4}>
                    <Input
                        name="descripcion"
                        label="Descripcion"
                        control={control}
                        helperText={errors.descripcion?.message}
                        error={errors.descripcion ? true : false}
                    />
                </Grid>
                <Grid item xs={1} sm={2} md={2}>
                </Grid>
                <Grid item xs={1} sm={2} md={2}>
                    <CheckBox
                        name="porDefecto"
                        label="Por Defecto"
                        control={control}
                        helperText={errors.porDefecto?.message}
                        error={errors.porDefecto ? true : false}
                    />
                </Grid>
            </Grid>
        </FormDialog>
    )
});

export default FormCategoria;
