import React, { useEffect } from 'react';

//control
import { useForm } from 'react-hook-form';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Stack from '@mui/material/Stack';

//Owned
import FormDialog from '@/common/FormDialog';
import api from '@/api/tasks/ApiBrand';
import { Input, CheckBox, TextArea } from '@/common/control';

//nombre imagen icono descripcion porDefecto
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('El nombre es requerido')
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(20, 'El nombre no debe exceder los 20 caracteres'),
    description: Yup.string()
        .required('La descripcion es requerido')
        .min(3, 'La descripcion debe tener al menos 3 caracteres')
        .max(90, 'La descripcion no debe exceder los 90 caracteres'),
    //id: Yup.number('Id debe ser de tipo entero').notRequired(),
});

const FormBrand = NiceModal.create(({ data, request, title }) => {
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

    useEffect(() => {
        const defaultValues = {
            id: data?.id || '',
            name: data?.name || '',
            description: data?.description || '',
            byDefault: data?.byDefault || false,
        };
        methods.reset(defaultValues);
    }, [data]);

    return (
        <FormDialog title={`${title} marca`} maxWidth="xs" methods={methods} callback={methods.handleSubmit(onSubmit)} modal={modal}>
            <Stack spacing={2}>
                <Input required label="Nombre" name="name" type="text" placeholder="Escribe el nombre de la marca" />
                <TextArea
                    required
                    label="Descripcion"
                    name="description"
                    type="text"
                    placeholder="Escribe una breve descripcion de la marca"
                />
                <CheckBox required label="Por Defecto" name="byDefault" />
            </Stack>
            <Input label="Codigo" name="id" type="hidden" disabled />
        </FormDialog>
    );
});

export default FormBrand;
