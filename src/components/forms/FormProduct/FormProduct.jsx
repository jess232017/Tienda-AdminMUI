import React, { useState, useEffect } from 'react'

//control
import JoditEditor from 'jodit-react'
import { useForm } from 'react-hook-form'
import NiceModal, { useModal } from '@ebay/nice-modal-react'

import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

//Mui
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

//Owned
import FormDialog from '@/common/FormDialog'
import apiCategoria from '@/api/tasks/ApiCategory'
import apiBrand from '@/api/tasks/ApiBrand'
import { Input, Select, Uploader, RichText, TextArea, CheckBox } from '@/common/control'

//descripcion categoriaId precioventa cantidad marca stockMinimo codigoqr
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('El nombre es requerido')
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(50, 'El nombre no debe exceder los 40 caracteres'),
    slug: Yup.string()
        .required('El slug es requerido')
        .min(3, 'El slug debe tener al menos 3 caracteres')
        .max(60, 'El slug no debe exceder los 50 caracteres'),
    description: Yup.string()
        .required('La descripcion es requerida')
        .min(3, 'La descripcion debe tener al menos 3 caracteres')
        .max(120, 'La descripcion no debe exceder los 120 caracteres'),
    categoryId: Yup.object({
        value: Yup.string().required('El id de la categoria es requerido'),
    })
        .typeError('Debe seleccionar una categoria')
        .required('La categoria es requerida'),
    brandId: Yup.object({
        value: Yup.string().required('El id de la marca es requerido'),
    })
        .typeError('Debe seleccionar una marca')
        .required('La marca es requerida'),
    price: Yup.number()
        .typeError('El precio deber ser de tipo numero')
        .required('El precio de venta es requerido')
        .positive('El precio debe ser positivo'),
    //stock: Yup.number().nullable().default(0).typeError('El stock deber ser de tipo numero').positive('La cantidad debe ser positivo'),
    safetyStock: Yup.number()
        .typeError('El precio deber ser de tipo numero')
        .required('El stock minimo es requerido')
        .positive('El stock minimo debe ser positivo'),
    isInventoriable: Yup.bool(),
})

const mapOption = (data) => {
    return data?.map(({ id, name }) => ({ label: name, value: id }))
}

const FormProducto = NiceModal.create(({ data, request, title }) => {
    //modal handle
    const modal = useModal()

    //validator
    const methods = useForm({
        resolver: yupResolver(validationSchema),
    })

    const txtName = methods.watch('name', '')
    methods.setValue(
        'slug',
        txtName
            ?.toLowerCase()
            ?.replace(/ /g, '-')
            ?.replace(/[^\w-]+/g, ''),
    )

    //Apis
    const { mutate } = request

    //get available categories
    const [content, setContent] = useState('')
    const { data: dataBrand } = apiBrand.get(1, 10)
    const { data: dataCatg } = apiCategoria.get(1, 10)
    const [categories, setCategories] = useState([])
    const [sourceImg, setSourceImg] = useState('')
    const [brands, setBrands] = useState([])

    const onSubmit = async (data) => {
        // const image = data.image ? await uploadImage(data.image) : null;
        const {
            brandId: { value: brandId },
            categoryId: { value: categoryId },
        } = data

        const final = { ...data, brandId, categoryId }
        console.log('final', final)

        mutate(final, {
            onSuccess: () => {
                methods.reset({})
                modal.hide()
            },
        })
    }

    //parse data from api to be admited for select control
    useEffect(() => {
        if (dataCatg?.data) {
            const { data } = dataCatg
            setCategories(mapOption(data))
        }
    }, [dataCatg])

    useEffect(() => {
        if (dataBrand?.data) {
            const { data } = dataBrand
            setBrands(mapOption(data))
        }
    }, [dataBrand])

    //reset inputs when data change
    useEffect(() => {
        const defaultValues = {
            name: data?.name || '',
            isGranel: data?.isGranel || false,
            isInventoriable: data?.isInventoriable || false,
            description: data?.description || '',
            categoryId: data?.categoryId || [],
            brandId: data?.brandId || [],
            price: data?.price || '',
            slug: data?.slug || '',
            stock: data?.stock,
            safetyStock: data?.safetyStock || '',
            id: data?.id || '',
        }
        setSourceImg(data?.image || '')
        methods.reset(defaultValues)
    }, [data])

    return (
        <FormDialog
            title={`${title} producto`}
            methods={methods}
            callback={methods.handleSubmit(onSubmit)}
            modal={modal}>
            <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} sm={12} md={4}>
                    <Card variant='outlined' sx={{ p: 5 }}>
                        <Uploader name='image' currentSrc={sourceImg} upload_preset='product_pib39m8' />
                        <Input label='Codigo' placeholder='*Se autogenera' name='id' disabled />
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                    <Card variant='outlined' sx={{ p: 5 }}>
                        <Grid container spacing={{ xs: 1, md: 2 }}>
                            <Grid item xs={12} sm={6}>
                                <Input
                                    required
                                    label='Nombre'
                                    name='name'
                                    type='text'
                                    placeholder='Escribe el nombre del producto'
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Select required label='Categoria' name='categoryId' options={categories} />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <RichText
                                    required
                                    label='Descripcion'
                                    name='description'
                                    type='text'
                                    placeholder='Escribe algo asombroso del producto...'
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Select required label='Marca' name='brandId' options={brands} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Input
                                    required
                                    label='Slug'
                                    name='slug'
                                    type='text'
                                    placeholder='Escribe una frase clave de busqueda'
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Input required label='Precio Venta' name='price' type='number' />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Input required label='Cantidad Minima' name='safetyStock' type='number' />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Input label='Cantidad Actual' name='stock' type='number' defaultValue={'0'} disabled />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <CheckBox required label='Inventariable' name='isInventoriable' />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <CheckBox required label='Granel' name='isGranel' />
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </FormDialog>
    )
})

export default FormProducto
