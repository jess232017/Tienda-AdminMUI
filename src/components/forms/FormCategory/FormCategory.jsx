import React, { useEffect } from 'react';

//control
import { useForm } from 'react-hook-form';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Stack from '@mui/material/Stack';

//Owned
import FormDialog from '@/common/FormDialog';
import { Input, CheckBox, TextArea, Select } from '@/common/control';

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
    // id: Yup.number('Id debe ser de tipo entero').notRequired(),
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

    useEffect(() => {
        const defaultValues = {
            id: data?.id || '',
            name: data?.name || '',
            description: data?.description || '',
        };
        methods.reset(defaultValues);
    }, [data]);

    return (
        <FormDialog title={`${title} categoria`} maxWidth="xs" methods={methods} callback={methods.handleSubmit(onSubmit)} modal={modal}>
            <Stack spacing={2}>
                <Input required label="Nombre*" name="name" type="text" />
                <Select label="Padre" name="parentId" options={[]} />
                <TextArea required label="Descripción*" name="description" minRows={4} />
                {/*<Input required label="Icono" name="icon" type="text" />*/}
                <Input label="Codigo" name="id" type="hidden" disabled />
                <CheckBox label="Seleccionar por defecto" name="byDefault" />
            </Stack>
        </FormDialog>
    );
});

export default FormCategory;
