import React from 'react';

//control
import { useForm } from 'react-hook-form';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Grid from '@mui/material/Grid';

//Owned
import FormDialog from '@/common/FormDialog';
import { Input, CheckBox } from '@/common/control';

//nombre imagen icono descripcion porDefecto
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('El nombre es requerido')
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(50, 'El nombre no debe exceder los 50 caracteres'),
    description: Yup.string()
        .required('La descripcion es requerido')
        .min(3, 'La descripcion debe tener al menos 3 caracteres')
        .max(200, 'La descripcion no debe exceder los 200 caracteres'),
    id: Yup.number('Id debe ser de tipo entero').notRequired(),
});

const FormCategory = NiceModal.create(({ data, request, title }) => {
    //modal handle
    const modal = useModal();

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
                modal.hide();
            },
        });
    };

    return (
        <FormDialog title={`${title} categoria`} maxWidth="sm" methods={methods} callback={methods.handleSubmit(onSubmit)} modal={modal}>
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 2, sm: 4, md: 6 }}>
                <Grid item xs={2} sm={2} md={2}>
                    <Input required label="Nombre" name="name" type="text" />
                </Grid>
                <Grid item xs={2} sm={2} md={4}>
                    <Input required label="Descripcion" name="description" type="text" />
                </Grid>
                <Grid item xs={1} sm={2} md={3}>
                    <Input required label="Icono" name="icon" type="text" />
                </Grid>
                <Grid item xs={1} sm={2} md={2}>
                    <Input label="Codigo" name="id" type="text" disabled />
                </Grid>
                <Grid item xs={1} sm={2} md={2}>
                    <CheckBox required label="Por Defecto" name="byDefault" />
                </Grid>
            </Grid>
        </FormDialog>
    );
});

export default FormCategory;
