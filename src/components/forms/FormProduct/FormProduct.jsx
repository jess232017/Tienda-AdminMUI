import React, { useState, useEffect } from 'react';

//control
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import NiceModal from '@ebay/nice-modal-react';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

//Mui
import Grid from '@mui/material/Grid';

//Owned
import { uploadImage } from '@/api';
import FormDialog from '@/common/FormDialog';
import apiProduct from '@/api/tasks/ApiProduct';
import apiCategoria from '@/api/tasks/ApiCategory';
import apiBrand from '@/api/tasks/ApiBrand';
import { Select, Input, Uploader } from '@/common/control';

//descripcion categoriaId precioventa cantidad marca stockMinimo codigoqr
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('El nombre es requerido')
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(20, 'El nombre no debe exceder los 20 caracteres'),
    description: Yup.string()
        .required('La descripcion es requerida')
        .min(3, 'La descripcion debe tener al menos 3 caracteres')
        .max(20, 'La descripcion no debe exceder los 20 caracteres'),
    categoryId: Yup.object({
        value: Yup.string().required('El id de la categoria es requerido'),
    }).required('La categoria es requeridas'),
    brandId: Yup.object({
        value: Yup.string().required('El id de la marca es requerido'),
    }).required('La marca es requerida'),
    price: Yup.number()
        .typeError('El precio deber ser de tipo numero')
        .required('El precio de venta es requerido')
        .positive('El precio debe ser positivo'),
    stock: Yup.number().typeError('El stock deber ser de tipo numero').positive('La cantidad debe ser positivo'),
    safetyStock: Yup.number()
        .typeError('El precio deber ser de tipo numero')
        .required('El stock minimo es requerido')
        .positive('El stock minimo debe ser positivo'),
});

const FormProducto = NiceModal.create(({ data, request, title }) => {
    //validator
    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    //Apis
    const { isLoading, mutateAsync } = request;

    //get available categories
    const { data: dataBrand } = apiBrand.get(1, 10);
    const { data: dataCatg } = apiCategoria.get(1, 10);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    const mapOption = (data) => {
        return data?.map(({ id, name }) => ({ label: name, value: id }));
    };

    const onSubmit = async (data) => {
        const image = data.image ? await uploadImage(data.image) : null;
        const {
            brandId: { value: brandId },
            categoryId: { value: categoryId },
        } = data;

        toast.promise(mutateAsync({ ...data, image, brandId, categoryId }), {
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

    //parse data from api to be admited for select control
    useEffect(() => {
        if (dataCatg?.data) {
            const { data } = dataCatg;
            setCategories(mapOption(data));
        }
    }, [dataCatg]);

    useEffect(() => {
        if (dataBrand?.data) {
            const { data } = dataBrand;
            setBrands(mapOption(data));
        }
    }, [dataBrand]);

    //reset inputs when data change
    useEffect(() => {
        const defaultValues = {
            name: data?.name || '',
            isGranel: data?.isGranel || false,
            isInventoriable: data?.isInventoriable || false,
            description: data?.description || '',
            categoryId: data?.categoryId || '',
            brandId: data?.brandId || '',
            price: data?.price || '',
            slug: data?.slug || '',
            stock: data?.stock || '',
            safetyStock: data?.safetyStock || '',
            id: data?.id || '',
        };
        methods.reset(defaultValues);
    }, [data]);

    return (
        <FormDialog title={`${title} producto`} processing={isLoading} methods={methods} callback={methods.handleSubmit(onSubmit)}>
            <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} sm={12} md={8}>
                    <Grid container spacing={{ xs: 1, md: 2 }}>
                        <Grid item xs={12} sm={6}>
                            <Input required label="Nombre" name="name" type="text" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Input required label="Descripcion" name="description" type="text" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Select required label="Marca" name="brandId" options={brands} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Select required label="Categoria" name="categoryId" options={categories} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Input required label="Slug" name="slug" type="text" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Input required label="Precio" name="price" type="number" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Input required label="Cantidad actual" name="stock" type="number" disabled />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Input required label="Cantidad minima" name="safetyStock" type="number" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Input required label="Inventariable" name="isInventoriable" type="checkbox" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Input required label="Granel" name="isGranel" type="checkbox" />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={12} md={4}>
                    <Uploader name="image" />
                    <Input required label="Codigo" name="id" disabled />
                </Grid>
            </Grid>
        </FormDialog>
    );
});

export default FormProducto;