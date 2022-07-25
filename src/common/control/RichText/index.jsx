import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import JoditEditor from 'jodit-react'
import Typography from '@mui/material/Typography'

const RichText = ({ label, ...rest }) => {
    const {
        control,
        formState: { errors },
    } = useFormContext()
    const { name } = rest

    return (
        <div className='input-style'>
            <label htmlFor={name}>
                {label}
                {rest.required && (
                    <Typography component='span' color='error'>
                        *
                    </Typography>
                )}
            </label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <JoditEditor
                        config={{
                            ...rest,
                            disablePlugins: 'about',
                        }}
                        value={field.value}
                        onBlur={(event) => {
                            field.onChange(event)
                        }}
                    />
                )}
            />
            <Typography variant='subtitle2' color='red' component='span' role='alert'>
                {errors[name]?.message || errors[name]?.value?.message || errors[name]?.label?.message}
            </Typography>
        </div>
    )
}

export default RichText
