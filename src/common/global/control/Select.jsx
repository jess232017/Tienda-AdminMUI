import React, { createElement } from 'react'
import { Controller } from 'react-hook-form'

import TextField from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import useMediaQuery from '@mui/material/useMediaQuery';

import DeskInput from '_@/common/global/control/desktop/DeskInput';
import DeskHelper from '_@/common/global/control/desktop/DeskHelper';

const SelectElement = ({
    name,
    required,
    valueKey = 'id',
    label = 'title',
    options = [],
    parseError,
    type,
    objectOnChange,
    validation = {},
    control,
    ...rest
}) => {
    const isNativeSelect = !!rest.SelectProps?.native

    if (required) {
        validation.required = 'This field is required';
    }

    return (
        <FormControl variant="standard"
            fullWidth
        >
            <InputLabel shrink htmlFor={name}
                sx={{ fontWeight: 600, fontSize: "1rem" }}
            >
                {label}
            </InputLabel>

            <Controller
                name={name}
                rules={validation}
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { invalid, error } }) => {
                    // handle shrink on number input fields
                    if (type === 'number' && value) {
                        rest.InputLabelProps = rest.InputLabelProps || {}
                        rest.InputLabelProps.shrink = true
                    }
                    if (typeof value === 'object') {
                        value = value[valueKey] // if value is object get key
                    }

                    return <TextField
                        {...rest}
                        name={name}
                        value={value || ''}
                        onBlur={onBlur}
                        onChange={(event) => {
                            let item = event.target.value
                            if (type === 'number') {
                                item = Number(item)
                            }
                            onChange(item)
                            if (typeof rest.onChange === 'function') {
                                if (objectOnChange) {
                                    item = options.find(i => i[valueKey] === item)
                                }
                                rest.onChange(item)
                            }
                        }}
                        input={
                            <DeskInput
                                fullWidth
                                color={error ? 'error' : 'primary'}
                            />
                        }
                        error={invalid}
                        required={required}
                        helpertext={error ? (typeof parseError === 'function' ? parseError(error) : error.message) : rest.helperText}
                    >
                        <MenuItem value="">
                            <em>Ninguno</em>
                        </MenuItem>
                        {options?.map(({ value, name }) => (
                            <MenuItem key={value} value={value}>{name}</MenuItem>
                        ))}
                    </TextField>
                }}
            />
        </FormControl>
    )

    return (
        <Controller
            name={name}
            rules={validation}
            control={control}
            render={({ field: { onBlur, onChange, value }, fieldState: { invalid, error } }) => {
                // handle shrink on number input fields
                if (type === 'number' && value) {
                    rest.InputLabelProps = rest.InputLabelProps || {}
                    rest.InputLabelProps.shrink = true
                }
                if (typeof value === 'object') {
                    value = value[valueKey] // if value is object get key
                }
                return <TextField
                    {...rest}
                    name={name}
                    value={value || ''}
                    onBlur={onBlur}
                    onChange={(event) => {
                        let item = event.target.value
                        if (type === 'number') {
                            item = Number(item)
                        }
                        onChange(item)
                        if (typeof rest.onChange === 'function') {
                            if (objectOnChange) {
                                item = options.find(i => i[valueKey] === item)
                            }
                            rest.onChange(item)
                        }
                    }}
                    select
                    required={required}
                    error={invalid}
                    helpertext={error ? (typeof parseError === 'function' ? parseError(error) : error.message) : rest.helperText}
                >
                    <MenuItem value="">
                        <em>Ninguno</em>
                    </MenuItem>
                    {options?.map(({ value, name }) => (
                        <MenuItem key={value} value={value}>{name}</MenuItem>
                    ))}
                </TextField>
            }}
        />
    )
}

export default SelectElement;


/*import * as React from 'react';

import { Controller } from "react-hook-form";

import MuiSelect from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import useMediaQuery from '@mui/material/useMediaQuery';

import DeskInput from '_@/common/global/control/desktop/DeskInput';
import DeskHelper from '_@/common/global/control/desktop/DeskHelper';

const Select = ({ name = "", label = "", control = "", items = [], error = false, helperText = "" }) => {
    const matches = useMediaQuery('(max-width:600px)');
    
    return (
        <FormControl variant="standard"
            fullWidth
        >
            <InputLabel shrink htmlFor={name}
                sx={{ fontWeight: 600, fontSize: "1rem" }}
            >
                {label}
            </InputLabel>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <>
                        <MuiSelect
                            {...field}
                            defaultValue=""
                            input={
                                <DeskInput
                                    fullWidth
                                    color={error ? 'error' : 'primary'}
                                />
                            }
                        >
                            <MenuItem value="">
                                <em>Ninguno</em>
                            </MenuItem>
                            {items?.map(({ value, name }) => (
                                <MenuItem key={value} value={value}>{name}</MenuItem>
                            ))}
                        </MuiSelect>

                        <DeskHelper>{helperText}</DeskHelper>
                    </>
                )}
            />
        </FormControl>
    )
}

export default Select;
*/