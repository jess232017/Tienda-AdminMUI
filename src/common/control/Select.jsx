import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import ReactSelect from 'react-select'
import Typography from '@mui/material/Typography'

const Select = ({ label, ...rest }) => {
    const {
        control,
        formState: { errors },
    } = useFormContext()
    const { name } = rest

    return (
        <div className='input-style'>
            <Typography component='label' variant='subtitle2' htmlFor={name}>
                {label}
                {rest.required && (
                    <Typography component='span' color='error'>
                        *
                    </Typography>
                )}
            </Typography>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <ReactSelect
                        {...rest}
                        {...field}
                        name={name}
                        menuPortalTarget={document.body}
                        menuShouldScrollIntoView={false}
                        placeholder='Seleccione...'
                        aria-invalid={errors[name] ? 'true' : 'false'}
                        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                    />
                )}
            />
            <Typography variant='subtitle2' color='red' component='span' role='alert'>
                {errors[name]?.message || errors[name]?.value?.message || errors[name]?.label?.message}
            </Typography>
        </div>
    )
}

export default Select
