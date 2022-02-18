import React from 'react'
import { red } from '@mui/material/colors'
import { Controller } from 'react-hook-form'

import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText
} from '@mui/material'

const CheckboxElement = ({
    name,
    validation = {},
    required,
    parseError,
    label,
    control,
    ...rest
}) => {

    if (required) {
        validation.required = 'This field is required'
    }

    return (
        <Controller
            name={name}
            rules={validation}
            control={control}
            render={({ field: { value, onChange }, fieldState: { invalid, error } }) => {
                const helperText = error ? (typeof parseError === 'function' ? parseError(error) : error.message) : rest.helperText
                return (
                    <FormControl required={required} error={invalid}>
                        <FormGroup row>
                            <FormControlLabel
                                label={label || ''}
                                control={
                                    <Checkbox
                                        color={'primary'}
                                        style={{
                                            color: invalid ? red[400] : undefined
                                        }}
                                        value={value}
                                        checked={!!value}
                                        onChange={() => {
                                            onChange(!value)
                                            //setValue(name, !formValue, { shouldValidate: true })
                                        }}
                                    />
                                }
                            />
                        </FormGroup>
                        {helperText && <FormHelperText error={invalid}>{helperText}</FormHelperText>}
                    </FormControl>
                )
            }}
        />
    )
}

export default CheckboxElement;

/*

const CheckBox = ({ name, label, control }) => {
    return (
        <ControlLabel
            control={
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <MuiCheckbox
                            {...field}
                            helpertext="Incorrect entry."
                        />
                    )}
                />
            }
            label={label}
            labelPlacement="start"
        />
    )
};

export default CheckBox;*/