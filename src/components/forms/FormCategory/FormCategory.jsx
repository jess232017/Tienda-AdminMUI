import React from 'react';

//control
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
    const { mutate } = request;

    const onSubmit = (data) => {
        mutate(data, {
            onSuccess: () => {
                methods.reset({});
            },
        });
    };

    return <p>prueba</p>;
});

export default FormCategory;
