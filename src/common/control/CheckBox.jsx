import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import FormGroup from '@mui/material/FormGroup';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const CheckBox = ({ label, ...rest }) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();
    const { name } = rest;

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <FormGroup>
                    <FormControlLabel control={<Checkbox {...field} {...rest} />} label={label} />
                    <Typography variant="subtitle2" color="red" component="span" role="alert">
                        {errors[name]?.message}
                    </Typography>
                </FormGroup>
            )}
        />
    );
};

export default CheckBox;
