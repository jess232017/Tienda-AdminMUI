import React, { useEffect, useState } from 'react';

//control
import { useForm } from 'react-hook-form';

import NiceModal, { useModal } from '@ebay/nice-modal-react';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Grid from '@mui/material/Grid';

//Owned
import FormDialog from '@/common/FormDialog';
import apiUser, { getRole } from '@/api/tasks/ApiUser';
import { Input, Select, Uploader, Password } from '@/common/control';

//nombre imagen icono descripcion porDefecto
const userSchema = Yup.object().shape({
    firstName: Yup.string()
        .required('El nombre es requerido')
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(30, 'El nombre no debe exceder los 30 caracteres'),
    lastName: Yup.string()
        .required('El apellido es requerido')
        .min(3, 'El apellido debe tener al menos 3 caracteres')
        .max(30, 'El apellido no debe exceder los 30 caracteres'),
    userName: Yup.string()
        .required('El usuario es requerido')
        .min(4, 'El usuario debe tener al menos 4 caracteres')
        .max(30, 'El usuario no debe exceder los 20 caracteres'),
    phoneNumber: Yup.number()
        .typeError('El telefono deber ser de tipo numero')
        .required('El telefono es requerido')
        .test('len', 'El telefono debe tener exactamente 8 caracteres', (val) => val.toString().length === 8),
    email: Yup.string().required('El correo es requerido').email('Debe ser un correo valido'),
    password: Yup.string()
        .required('La contraseña es requeridad')
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .max(16, 'La contraseña no debe exceder los 16 caracteres')
        .matches(
            /^.*(?=.{8,16})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            'La contraseña debe tener al menos 8 y maximo 16 caracteres, al menos una mayuscula, al menos un numero y al menos un caracter especial (!?$*.).'
        ),
    roles: Yup.array().test('len', 'Debe asignarle al menos un rol al usuario', (val) => val?.length >= 1),
});

const FormUser = NiceModal.create(({ data, request, title }) => {
    //modal handle
    const modal = useModal();

    //validator
    const methods = useForm({
        shouldUnregister: true,
        resolver: yupResolver(userSchema),
    });

    const [options, setOptions] = useState([]);
    const [currentSrc, setCurrentSrc] = useState('');
    const { mutate } = request;
    const { isLoading: gettingRole, data: dataRole } = getRole(1, 100);

    const onSubmit = async (data) => {
        /* const image = data.image ? await uploadImage(data.image) : null;
        const final = { ...data, image };
        console.log('final', final);*/

        mutate(data, {
            onSuccess: () => {
                methods.reset({
                    firstName: '',
                    lastName: '',
                    userName: '',
                    phoneNumber: '',
                    email: '',
                    password: '',
                    roles: [],
                });
                modal.hide();
            },
        });
    };

    useEffect(() => {
        if (dataRole?.data) {
            const options = dataRole?.data.map(({ id, name }) => ({
                value: id,
                label: name,
            }));
            setOptions(options);
        }
    }, [dataRole]);

    //reset inputs when data change
    useEffect(() => {
        const defaultValues = {
            id: data?.id || '',
            firstName: data?.firstName || '',
            lastName: data?.lastName || '',
            userName: data?.userName || '',
            phoneNumber: data?.phoneNumber || '',
            email: data?.email || '',
            password: data?.password || '',
            roles: data?.roles || [],
        };
        setCurrentSrc(data?.image || '');
        methods.reset(defaultValues);
    }, [data]);

    return (
        <FormDialog title={`${title} usuario`} methods={methods} callback={methods.handleSubmit(onSubmit)} modal={modal}>
            <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} sm={12} md={8}>
                    <Grid container spacing={{ xs: 1, md: 2 }}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Input name="firstName" label="Nombres" placeHolder="Juan Carlos" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Input name="lastName" label="Apellidos" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Input name="phoneNumber" type="number" label="Telefono" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Input name="email" type="email" label="Correo" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Input name="userName" label="Usuario" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Password name="password" autoComplete="new-password" label="Contraseña" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={8}>
                            <Select name="roles" label="Roles" options={options} isLoading={gettingRole} />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={12} md={4}>
                    <Uploader name="image" currentSrc={currentSrc} />
                    <Input required label="Codigo" name="id" disabled />
                </Grid>
            </Grid>
        </FormDialog>
    );
});

export default FormUser;
