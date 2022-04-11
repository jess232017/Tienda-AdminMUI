import React, { useState, useEffect, useRef } from 'react';

//control
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import NiceModal from '@ebay/nice-modal-react';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

//Mui
import Grid from '@mui/material/Grid';

//Owned
import FormDialog from '_@/common/FormDialog';
import apiProduct from '_@/api/tasks/ApiProduct';
import apiCategoria from '_@/api/tasks/ApiCategory';
import apiBrand from '_@/api/tasks/ApiBrand';
import Uploader from '_@/components/Uploader';
import Select from '_@/common/control/Select';
import Input from '_@/common/control/Input';

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
    categoryId: Yup.number().required('La categoria es requerida'),
    brandId: Yup.number().required('La categoria es requerida'),
    price: Yup.number('Debe ingresar un numero').required('El precio de venta es requerido').positive('El precio debe ser positivo'),
    stock: Yup.number('Debe ingresar un numero').positive('La cantidad debe ser positivo'),
    safetyStock: Yup.number('Debe ingresar un numero')
        .required('El stock minimo es requerido')
        .positive('El stock minimo debe ser positivo'),
});

const FormProducto = NiceModal.create(({ data, request }) => {
    const {
        handleSubmit,
        formState: { errors },
        register,
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    //Apis
    const isNew = data == null;
    const { isLoading, mutateAsync } = request;

    //get available categories
    const { data: dataBrand } = apiBrand.get(`?PageNumber=1&PageSize=30`);
    const { data: dataCatg } = apiCategoria.get(`?PageNumber=1&PageSize=30`);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    //parse data from api to be admited for select control
    useEffect(() => {
        if (dataCatg?.data != null) {
            const {
                data: { data },
            } = dataCatg;
            setCategories(data?.map(({ id, name }) => ({ name, value: id })));
        }
    }, [dataCatg]);

    useEffect(() => {
        if (dataBrand?.data != null) {
            const {
                data: { data },
            } = dataBrand;
            setBrands(data?.map(({ id, name }) => ({ name, value: id })));
        }
    }, [dataBrand]);

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
        <FormDialog title={`${isNew ? 'Agregar' : 'Actualizar'} producto`} processing={isLoading} callback={handleSubmit(onSubmit)}>
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={1} sm={1} md={2}>
                    <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 2, sm: 4, md: 6 }}>
                        <Grid item xs={2} sm={4} md={3}>
                            <Input required label="Nombre" name="name" type="text" register={register} error={errors} />
                        </Grid>
                        <Grid item xs={1} sm={4} md={3}>
                            <Input required label="Descripcion" name="description" type="text" register={register} error={errors} />
                        </Grid>

                        <Grid item xs={1} sm={2} md={2}>
                            <Select required label="Marca" name="brandId" type="text" options={brands} register={register} error={errors} />
                        </Grid>
                        <Grid item xs={1} sm={2} md={2}>
                            <Select
                                required
                                label="Categoria"
                                name="categoryId"
                                type="number"
                                autoComplete="on"
                                options={categories}
                                register={register}
                                error={errors}
                            />
                        </Grid>
                        <Grid item xs={1} sm={4} md={2}>
                            <Input required label="Slug" name="slug" type="text" register={register} error={errors} />
                        </Grid>
                        <Grid item xs={1} sm={2} md={2}>
                            <Input required label="Precio" name="price" type="number" register={register} error={errors} />
                        </Grid>
                        <Grid item xs={1} sm={2} md={2}>
                            <Input
                                required
                                label="Cantidad actual"
                                name="stock"
                                type="number"
                                disabled
                                register={register}
                                error={errors}
                            />
                        </Grid>
                        <Grid item xs={1} sm={2} md={2}>
                            <Input required label="Cantidad minima" name="safetyStock" type="number" register={register} error={errors} />
                        </Grid>
                        <Grid item xs={1} sm={2} md={3}>
                            <Input
                                required
                                label="Inventariable"
                                name="isInventoriable"
                                type="checkbox"
                                register={register}
                                error={errors}
                            />
                        </Grid>
                        <Grid item xs={1} sm={2} md={3}>
                            <Input required label="Granel" name="isGranel" type="checkbox" register={register} error={errors} />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={1} sm={1} md={1}>
                    <Uploader />
                    <Input required label="Codigo" name="productoId" type="number" register={register} error={errors} disabled />
                </Grid>
            </Grid>
        </FormDialog>
    );
});

export default FormProducto;
