import React from 'react';
import { useFormContext } from 'react-hook-form';

import Typography from '@mui/material/Typography';

const Input = ({ startAdornment, label, ...rest }) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    const { name, required, type } = rest;

    return (
        <div className="input-style">
            {type !== 'hidden' && <label htmlFor={name}>{label}</label>}

            <div className="relative">
                <div className="left-icon">{startAdornment}</div>
                <input
                    {...rest}
                    id={name}
                    {...register(name, { required })}
                    aria-invalid={errors[name] ? 'true' : 'false'}
                    className={`${startAdornment && 'left-space'}`}
                />
            </div>

            {type !== 'hidden' && (
                <Typography variant="subtitle2" color="red" component="span" role="alert">
                    {errors[name]?.message}
                </Typography>
            )}
        </div>
    );
};

export default Input;
