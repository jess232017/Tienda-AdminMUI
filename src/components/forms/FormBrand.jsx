import React, { useEffect } from 'react';

//control
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import NiceModal from '@ebay/nice-modal-react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Grid from '@mui/material/Grid';

//Owned
import FormDialog from '_@/common/FormDialog';
import api from '_@/api/tasks/ApiBrand';
import Input from '_@/common/control/Input';

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

const FormBrand = NiceModal.create(({ data, request }) => {
    //validator
    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    //Apis
    const isNew = data == null;
    const { isLoading, mutateAsync } = request;

    //set data in dialog
    useEffect(() => {
        setValue('id', data?.id);
        setValue('name', data?.name);
        setValue('icon', data?.icon);
        setValue('description', data?.description);
    }, [data]);

    const onSubmit = (data) => {
        toast.promise(mutateAsync(data), {
            pending: 'Guardando los cambios...',
            success: {
                render() {
                    return 'Guardado correctamente';
                },
            },
            error: {
                render({ data }) {
                    const error = data?.response?.data?.error;
                    return error?.message || data?.message;
                },
            },
        });
    };

    return (
        <FormDialog title={`${isNew ? 'Agregar' : 'Actualizar'} marca`} processing={isLoading} callback={handleSubmit(onSubmit)}>
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 2, sm: 4, md: 6 }}>
                <Grid item xs={2} sm={4} md={4}>
                    <Input required label="Nombre" name="name" type="text" register={register} error={errors} />
                </Grid>
                <Grid item xs={1} sm={2} md={2}>
                    <Input label="Codigo" name="id" type="text" register={register} error={errors} disabled />
                </Grid>
                <Grid item xs={2} sm={4} md={4}>
                    <Input required label="Descripcion" name="description" type="text" register={register} error={errors} />
                </Grid>
                <Grid item xs={1} sm={2} md={2}></Grid>
                <Grid item xs={1} sm={2} md={2}>
                    <Input required label="Por Defecto" name="byDefault" type="checkbox" register={register} error={errors} />
                </Grid>
            </Grid>
        </FormDialog>
    );
});

export default FormBrand;
