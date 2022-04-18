import React from 'react';

//control
import { useForm } from 'react-hook-form';
import NiceModal from '@ebay/nice-modal-react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Grid from '@mui/material/Grid';

//Owned
import FormDialog from '@/common/FormDialog';
import api from '@/api/tasks/ApiBrand';
import Input from '@/common/control/Input';

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

const FormBrand = NiceModal.create(({ data, request, title }) => {
    //validator
    const methods = useForm({
        shouldUnregister: true,
        resolver: yupResolver(validationSchema),
    });

    //Apis
    const { mutate } = request;

    const onSubmit = (data) => {
        mutate(data, {
            onSuccess: () => {
                methods.reset({});
            },
        });
    };

    return (
        <FormDialog title={`${title} marca`} methods={methods} callback={methods.handleSubmit(onSubmit)}>
            <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} sm={6} md={8}>
                    <Input required label="Nombre" name="name" type="text" />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Input label="Codigo" name="id" type="text" disabled />
                </Grid>
                <Grid item xs={12} sm={6} md={8}>
                    <Input required label="Descripcion" name="description" type="text" />
                </Grid>
                <Grid item xs={1} sm={2} md={4} />
                <Grid item xs={12} sm={6} md={2}>
                    <Input required label="Por Defecto" name="byDefault" type="checkbox" />
                </Grid>
            </Grid>
        </FormDialog>
    );
});

export default FormBrand;
