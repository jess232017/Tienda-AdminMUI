import React, { useEffect, useState } from 'react';

//control
import { useForm } from 'react-hook-form';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Stack from '@mui/material/Stack';

//muiIcon
import CategoryIcon from '@mui/icons-material/Category';

//Owned
import FormDialog from '@/common/FormDialog';
import { Input, CheckBox, TextArea, Select } from '@/common/control';
import { apiCategory } from '../../../api/tasks';

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
    slug: Yup.string()
        .required('El slug es requerido')
        .min(3, 'El slug debe tener al menos 3 caracteres')
        .max(60, 'El slug no debe exceder los 50 caracteres'),
    // id: Yup.number('Id debe ser de tipo entero').notRequired(),
});

const FormCategory = NiceModal.create(({ data, request: { mutate }, title }) => {
    //modal handle
    const modal = useModal();
    const [options, setOptions] = useState([]);
    const { data: categories, loading } = apiCategory.get(1, 100);

    //validator
    const methods = useForm({
        shouldUnregister: true,
        resolver: yupResolver(validationSchema),
    });
    const txtName = methods.watch('name', '');
    methods.setValue(
        'slug',
        txtName
            ?.toLowerCase()
            ?.replace(/ /g, '-')
            ?.replace(/[^\w-]+/g, '')
    );

    const onSubmit = (data) => {
        mutate(data, {
            onSuccess: () => {
                methods.reset({});
                modal.hide();
            },
        });
    };

    useEffect(() => {
        if (categories?.data) {
            const options = categories?.data.map(({ id, name }) => ({
                value: id,
                label: name,
            }));
            setOptions(options);
        }
    }, [categories]);

    useEffect(() => {
        const defaultValues = {
            id: data?.id || '',
            name: data?.name || '',
            slug: data?.slug || '',
            description: data?.description || '',
        };
        methods.reset(defaultValues);
    }, [data]);

    return (
        <FormDialog title={`${title} categoria`} maxWidth="xs" methods={methods} callback={methods.handleSubmit(onSubmit)} modal={modal}>
            <Stack spacing={2}>
                <Input
                    required
                    label="Nombre*"
                    name="name"
                    type="text"
                    autoComplete="new-password"
                    startAdornment={<CategoryIcon fontSize="small" color="secondary" />}
                    placeholder="Escribe el nombre de la categoria"
                />
                <Input
                    required
                    label="Slug*"
                    name="slug"
                    type="text"
                    autoComplete="new-password"
                    placeholder="Escribe una frase clave de busqueda"
                />
                <Select label="Padre" name="parentId" loading={loading} options={options} />
                <TextArea
                    required
                    label="Descripción*"
                    name="description"
                    minRows={4}
                    placeholder="Escribe una breve descripcion de la categoria"
                />
                {/*<Input required label="Icono" name="icon" type="text" />*/}
            </Stack>
            <CheckBox label="Seleccionar por defecto" name="byDefault" />
            <Input label="Codigo" name="id" type="hidden" disabled />
        </FormDialog>
    );
});

export default FormCategory;
