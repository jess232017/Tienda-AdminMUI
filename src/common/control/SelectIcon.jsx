import React, { useLayoutEffect, useEffect, useState, useRef } from 'react';

import { useFormContext } from 'react-hook-form';
import IconPicker from 'vanilla-icon-picker';

import Typography from '@mui/material/Typography';

const SelectIcon = ({ label, ...rest }) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    const { name, required, type } = rest;
    const [selected, setSelected] = useState('');
    //   const ref = useRef(null);

    useEffect(() => {
        try {
            const iconPickerInput = new IconPicker(`picker-${name}`, {
                theme: 'bootstrap-5',
                iconSource: 'Material Design Icons',
                closeOnSelect: true,
            });

            iconPickerInput.on('select', (instance) => {
                console.log('Select:', instance);
            });
        } catch (error) {
            console.log('----->', error);
        }
    }, []);

    useLayoutEffect(() => {
        // side effects
        try {
            const iconPickerInput = new IconPicker(`picker-${name}`, {
                theme: 'bootstrap-5',
                iconSource: [
                    {
                        key: 'academicons',
                        prefix: 'ai ai-',
                        url: 'https://raw.githubusercontent.com/iconify/icon-sets/master/json/academicons.json',
                    },
                ],
                closeOnSelect: true,
            });

            iconPickerInput.on('select', (instance) => {
                console.log('Select:', instance);
            });
        } catch (error) {
            console.log('----->', error);
        }
        /*
         */
        // cleanup
        return () => {
            // iconPickerInput.hide();
            //iconPickerInput.off();
        };
    }, []);

    return (
        <div className="input-style">
            {type !== 'hidden' && <label htmlFor={name}>{label}</label>}
            <input id={`picker-${name}`} />
            <input {...rest} id={name} {...register(name, { required })} aria-invalid={errors[name] ? 'true' : 'false'} />
            {type !== 'hidden' && (
                <Typography variant="subtitle2" color="red" component="span" role="alert">
                    {errors[name]?.message}
                </Typography>
            )}
        </div>
    );
};

export default SelectIcon;
