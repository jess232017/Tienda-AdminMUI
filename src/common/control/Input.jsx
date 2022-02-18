import React from 'react';
import Typography from '@mui/material/Typography'

const Input = ({ label, register, required = false, error, ...rest }) => {
    const { name } = rest;

    return (
        <div className='input-style'>
            <label htmlFor={name}>{label}</label>
            <input  {...rest} id={name} {...register(name, { required })} />
            <Typography variant="subtitle2" color="red" component="span">{error[name]?.message}</Typography>
        </div>
    );
}

export default Input;