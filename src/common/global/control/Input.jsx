
import React from 'react';

import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Controller } from 'react-hook-form'

import DeskInput from '_@/common/global/control/desktop/DeskInput';
import DeskHelper from '_@/common/global/control/desktop/DeskHelper';

//const Input = ({ name, label, control, type = "text", error = false, helperText = "", icon }) => {
const TextFieldElement = ({ validation = {}, parseError, type, required, name, label, error = false, control, ...rest }) => {

    if (required) {
        validation.required = 'This field is required'
    }

    if (type === 'email') {
        validation.pattern = {
            // eslint-disable-next-line no-useless-escape
            value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'Please enter a valid email address'
        }
    }

    return (
        <FormControl
            variant="standard"
            fullWidth
            error={error}
        >
            <InputLabel shrink
                htmlFor={name}
                sx={{ fontWeight: 600, fontSize: "1rem", pt: 0 }}
                error={error}
            >
                {label}
            </InputLabel>
            <Controller
                name={name}
                control={control}
                rules={validation}
                render={({ field: { value, onChange, onBlur }, fieldState: { invalid, error } }) =>
                    <DeskInput
                        {...rest}
                        name={name}
                        value={value || ''}
                        onChange={onChange}
                        onBlur={onBlur}
                        required={required}
                        type={type}
                        error={invalid}
                        helpertext={error ? (typeof parseError === 'function' ? parseError(error) : error.message) : rest.helperText}
                    />
                }
            />
        </FormControl>
    )
}
export default TextFieldElement;

/*import React from "react";

import { Controller } from "react-hook-form";

import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import useMediaQuery from '@mui/material/useMediaQuery';
import InputAdornment from '@mui/material/InputAdornment';

import DeskInput from '_@/common/global/control/desktop/DeskInput';
import DeskHelper from '_@/common/global/control/desktop/DeskHelper';

const Input = ({ name, label, control, type = "text", error = false, helperText = "", icon }) => {
    const matches = useMediaQuery('(max-width:600px)');

    return (
        <FormControl
            variant="standard"
            fullWidth
            error={error}
        >
            <InputLabel shrink
                htmlFor={name}
                sx={{ fontWeight: 600, fontSize: "1rem" }}
                error={error}
            >
                {label}
            </InputLabel>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <>
                        <DeskInput
                            {...field}
                            type={type}
                            fullWidth
                            error={error}
                            color={error ? 'error' : 'primary'}
                        />
                        <DeskHelper>{helperText}</DeskHelper>
                    </>
                )}
            />

        </FormControl>
    )
};

export default Input;*/
