import React from 'react';
import Typography from '@mui/material/Typography'

const Select = ({ label, register, required = false, error, options = [], ...rest }) => {
    const { name } = rest;

    return (
        <div className='input-style'>
            <label htmlFor={name}>{label}</label>
            <select {...rest} id={name} {...register(name, { required })} autoComplete="on" >
                {options?.map(({ name, value }) => (
                    <option value={value} key={value}>{name}</option>
                ))}
            </select>
            <Typography variant="subtitle2" color="red" component="span">{error[name]?.message}</Typography>
        </div>
    );
}

export default Select;