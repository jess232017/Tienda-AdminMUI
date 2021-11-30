import React, {useState, useEffect} from 'react'

//control
import { useForm } from "react-hook-form";
import NiceModal from '@ebay/nice-modal-react';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

//Mui
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar'

//Owned
import FormDialog from 'src/common/FormDialog';
import ApiProducto from 'src/services/api/tasks/ApiProducto';
import apiCategoria from 'src/services/api/tasks/ApiCategoria';
import {Input, CheckBox, Select} from 'src/common/global/control/index';

//descripcion categoriaId precioventa cantidad marca stockMinimo codigoqr
const validationSchema = Yup.object().shape({
    descripcion: Yup.string()
        .required('El nombre es requerido')
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(20, 'El nombre no debe exceder los 20 caracteres'),
    categoriaId: Yup.string()
        .required('La categoria es requerida')
        .uuid("El texto no concide con un GUID")
        .length(36, 'El campo debe ser igual a 36 caracteres'),
    precioventa: Yup.number("Debe ingresar un numero")
        .required('El precio de venta es requerido')
        .positive('El precio debe ser positivo'),
    cantidad: Yup.number("Debe ingresar un numero")
        .positive('La cantidad debe ser positivo'),
    marca: Yup.string()
        .required('La marca es requerido')
        .min(3, 'La marca debe tener al menos 3 caracteres')
        .max(20, 'La marca no debe exceder los 20 caracteres'),
    stockMinimo: Yup.number("Debe ingresar un numero")
        .required('El stock minimo es requerido')
        .positive('El stock minimo debe ser positivo'),
    codigoqr: Yup.string()
        .min(3, 'El codigoqr debe tener al menos 3 caracteres')
});

const FormProducto = NiceModal.create( ({title, method, data: source, queryKey}) =>{
    const { handleSubmit, formState: { errors }, control } = useForm({
        resolver: yupResolver(validationSchema),
    });

    //Apis
    const {isLoading, mutate} = ApiProducto.agregarProducto('producto');

    //Obtener las categorias disponibles
    const { data } = apiCategoria.obtenerCategoria();
    const [categories, setCategories] = useState({});

    //Convertir a datos admitidos por Select Control
    useEffect(() => {
        setCategories(data?.data.map( ({categoriaId, nombre}) => ({
            name : nombre,
            value: categoriaId,
        })));
    }, [data])

    const onSubmit = (data) => {
        console.log(data)

        mutate(data, {
            onSuccess: (data) => {                    
                alert(JSON.stringify(data));
            },
            onError: (error) => {
                alert(JSON.stringify(error));
                //toast.current.show({severity:'error', summary: '', detail: error.mensaje});
            },
        });
    };

    return (
        <FormDialog
            title={title}
            processing={isLoading}
            callback= {handleSubmit(onSubmit)}
        >
            <Grid container spacing={{xs: 1, md: 2}} columns={{xs: 1, sm: 2, md: 3}}>
                <Grid item xs={1} sm={1} md={2}>
                    <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 2, sm: 4, md: 6}}>
                        <Grid item xs={2} sm={4} md={3}>
                            <Input
                                name="descripcion"
                                label="Descripcion"
                                control = {control}
                                helperText={errors.descripcion?.message}
                                error={errors.descripcion ? true : false}
                            />
                        </Grid>
                        <Grid item xs={1} sm={4} md={3}>
                            <Select
                                name="categoriaId"
                                label="Categoria"
                                control={control}
                                items={categories}
                                helperText={errors.categoriaId?.message}
                                error={errors.categoriaId ? true : false}
                            />
                        </Grid>
                        <Grid item xs={1} sm={4} md={3}>
                            <Input
                                name="precioventa"
                                label="PrecioVenta"
                                control = {control}
                                type="number"
                                helperText={errors.precioventa?.message}
                                error={errors.precioventa ? true : false}
                            />
                        </Grid>
                        <Grid item xs={1} sm={4} md={3}>
                            <Input
                                name="cantidad"
                                label="Cantidad"
                                control = {control}
                                type="number"
                                helperText={errors.cantidad?.message}
                                error={errors.cantidad ? true : false}
                            />
                        </Grid>
                        <Grid item xs={1} sm={2} md={3}>
                            <Input
                                name="marca"
                                label="Marca"
                                control = {control}
                                helperText={errors.marca?.message}
                                error={errors.marca ? true : false}
                            />
                        </Grid>
                        <Grid item xs={1} sm={2} md={3}>
                            <Input
                                name="stockMinimo"
                                label="Stock Minimo"
                                control = {control}
                                type="number"
                                helperText={errors.stockMinimo?.message}
                                error={errors.stockMinimo ? true : false}
                            />
                        </Grid>
                        <Grid item xs={1} sm={4} md={3}>
                            <Input
                                name="codigoqr"
                                label="CodigoQR"
                                control = {control}
                                helperText={errors.codigoqr?.message}
                                error={errors.codigoqr ? true : false}
                            />
                        </Grid>
                        <Grid item xs={1} sm={4} md={3}>
                        </Grid>

                        <Grid item xs={1} sm={4} md={3}>
                            <CheckBox
                                name="granel"
                                label="Granel"
                                control = {control}
                            />
                        </Grid>

                        <Grid item xs={1} sm={4} md={3}>
                            <CheckBox
                                name="inventariado"
                                label="Inventariado"
                                control = {control}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                
                
                <Grid item xs={1} sm={1} md={1}>

                    <Avatar variant="rounded" sx={{height: '250px', width: "100%", mb: 2}}/>
                    <Input
                        name="image"
                        label="Imagen"
                        control = {control}
                        type="file"
                    />
                    <Input
                        name="productoId"
                        label="Producto Id"
                        control = {control}
                        helperText={errors.productoId?.message}
                        error={errors.productoId ? true : false}
                    />
                </Grid>
            </Grid>
            
        </FormDialog>
    )
});

export default FormProducto;
