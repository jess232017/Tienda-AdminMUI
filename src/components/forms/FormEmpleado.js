import React from 'react'

//control
import { useForm } from "react-hook-form";
import NiceModal from '@ebay/nice-modal-react';

//Mui
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

//Owned
import FormDialog from 'src/common/FormDialog';
import {Input, CheckBox, Select} from 'src/common/global/control/index';

const FormEmpleado = NiceModal.create( ({title, method, data: source, queryKey}) =>{
    const { handleSubmit, reset, control } = useForm();
    const onSubmit = (data) => console.log(data);

    return (
        <FormDialog
            title= {title}
            callback= {onSubmit}
        >
            <Grid container spacing={{xs: 1, md: 2}} columns={{xs: 1, sm: 2, md: 3}}>
                <Grid item xs={1} sm={1} md={2}>
                    <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 2, sm: 4, md: 6}}>
                        <Grid item xs={2} sm={4} md={3}>
                            <Input
                                name="nombre"
                                label="Nombre"
                                control = {control}
                            />
                        </Grid>
                        <Grid item xs={1} sm={4} md={3}>
                            <Input
                                name="apellido"
                                label="Apellido"
                                control = {control}
                            />
                        </Grid>
                        <Grid item xs={1} sm={4} md={3}>
                            <Input
                                name="telefono"
                                label="Telefono"
                                control = {control}
                            />
                        </Grid>
                        <Grid item xs={1} sm={4} md={3}>
                            <Select
                                name="rol"
                                label="Rol"
                                control = {control}
                            />
                        </Grid>
                        <Grid item xs={1} sm={4} md={6}>
                            <Card variant="outlined">
                                <CardHeader title="Sistema" sx={{pt: 2, pb: 0}}/>
                                <CardContent>
                                    <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 2, sm: 4, md: 6}}>
                                        <Grid item xs={2} sm={4} md={3}>
                                            <Input
                                                name="usuario"
                                                label="Usuario"
                                                control = {control}
                                            />
                                        </Grid>
                                        <Grid item xs={2} sm={4} md={3}>
                                            <Input
                                                name="clave"
                                                label="Clave"
                                                type="password"
                                                control = {control}
                                            />
                                        </Grid>
                                        <Grid item xs={2} sm={4} md={3}>
                                            <Input
                                                name="correo"
                                                label="Correo"
                                                type="email"
                                                control = {control}
                                            />
                                        </Grid>
                                        <Grid item xs={2} sm={4} md={3}>
                                            <Input
                                                name="estado"
                                                label="Estado"
                                                control = {control}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                
                
                <Grid item xs={1} sm={1} md={1}>

                    <Avatar variant="rounded" sx={{height: '250px', width: "100%", mb: 2}}/>

                    <Input
                        name="empleadoId"
                        label="Empleado Id"
                        control = {control}
                    />
                </Grid>

              
            </Grid>
            
        </FormDialog>
    )
});

export default FormEmpleado;
