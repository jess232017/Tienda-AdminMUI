import React from 'react';
import { useFormContext } from 'react-hook-form';

import Typography from '@mui/material/Typography';

const Input = ({ label, ...rest }) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    const { name, required } = rest;

    return (
        <div className="input-style">
            <label htmlFor={name}>{label}</label>
            <input {...rest} id={name} {...register(name, { required })} aria-invalid={errors[name] ? 'true' : 'false'} />
            <Typography variant="subtitle2" color="red" component="span" role="alert">
                {errors[name]?.message}
            </Typography>
        </div>
    );
};

export default Input;
