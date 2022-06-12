import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import PhoneInput from 'react-phone-input-2';
import Typography from '@mui/material/Typography';
import es from 'react-phone-input-2/lang/es.json';

const Phone = ({ label, ...rest }) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();
    const { name } = rest;

    return (
        <div className="input-style">
            <label htmlFor={name}>{label}</label>
            <Controller
                name={name}
                control={control}
                render={({ field: { ref, ...field } }) => (
                    <PhoneInput
                        {...field}
                        {...rest}
                        inputExtraProps={{
                            ref,
                            name: name,
                            required: true,
                            autoFocus: true,
                        }}
                        enableSearch
                        country="ni"
                        localization={es}
                        placeholder="+505 1234-5678"
                        searchPlaceholder="Buscar"
                        masks={{ ni: '....-....' }}
                        searchNotFound="No se encontraron elementos con el criterio de busquedad"
                    />
                )}
            />
            <Typography variant="subtitle2" color="red" component="span" role="alert">
                {errors[name]?.message || errors[name]?.value?.message || errors[name]?.label?.message}
            </Typography>
        </div>
    );
};

export default Phone;
