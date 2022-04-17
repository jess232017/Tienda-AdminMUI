import React, { useEffect } from 'react';

//control
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import NiceModal from '@ebay/nice-modal-react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Grid from '@mui/material/Grid';

//Owned
import FormDialog from '@/common/FormDialog';
import { Input } from '@/common/control';

//nombre imagen icono descripcion porDefecto
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('El nombre es requerido')
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(20, 'El nombre no debe exceder los 20 caracteres'),
    description: Yup.string()
        .required('La descripcion es requerido')
        .min(3, 'La descripcion debe tener al menos 3 caracteres')
        .max(50, 'La descripcion no debe exceder los 20 caracteres'),
    id: Yup.number('Id debe ser de tipo entero').notRequired(),
});

const FormCategory = NiceModal.create(({ data, request, title }) => {
    //validator
    const methods = useForm({
        shouldUnregister: true,
        resolver: yupResolver(validationSchema),
    });

    //Apis
    const { isLoading, mutateAsync } = request;

    const onSubmit = (data) => {
        toast.promise(mutateAsync(data), {
            pending: 'Guardando los cambios...',
            success: {
                render() {
                    return 'Guardado correctamente';
                },
            },
            error: {
                render(info) {
                    console.log('data', JSON.stringify(info), info);
                    const data = info.data;
                    const error = data?.response?.data?.error;
                    const errors = JSON.stringify(data?.response?.data?.errors);
                    return error?.message || errors;
                },
            },
        });
    };

    return (
        <FormDialog title={`${title} categoria`} processing={isLoading} methods={methods} callback={methods.handleSubmit(onSubmit)}>
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 2, sm: 4, md: 6 }}>
                <Grid item xs={2} sm={4} md={4}>
                    <Input required label="Nombre" name="name" type="text" />
                </Grid>
                <Grid item xs={1} sm={2} md={2}>
                    <Input required label="Icono" name="icon" type="text" />
                </Grid>
                <Grid item xs={2} sm={4} md={4}>
                    <Input required label="Descripcion" name="description" type="text" />
                </Grid>
                <Grid item xs={1} sm={2} md={2}>
                    <Input label="Codigo" name="id" type="text" disabled />
                </Grid>
                <Grid item xs={1} sm={2} md={2}>
                    <Input required label="Por Defecto" name="byDefault" type="checkbox" />
                </Grid>
            </Grid>
        </FormDialog>
    );
});

export default FormCategory;
