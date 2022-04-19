import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import fslightboxReact from 'fslightbox-react';
//import FsLightbox from 'fslightbox-react';

import Image from 'mui-image';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import { uploadImage } from '@/api';

const Uploader = ({ label, currentSrc = '', ...rest }) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();
    const { name } = rest;

    const [toggler, setToggler] = useState(false);
    const [image, setImage] = useState(currentSrc);

    const handleChange = ({ target: { files } }, onChange) => {
        const [file] = files;
        if (file) {
            const src = URL.createObjectURL(file);
            setImage(src);
            onChange(file);
        }
    };

    const handleToggle = () => {
        if (image !== '') setToggler(!toggler);
    };

    return (
        <>
            <div className="input-style uploader">
                <Image
                    src={image}
                    fit="contain"
                    bgColor="#000"
                    onClick={handleToggle}
                    wrapperStyle={{ borderRadius: '.3rem', height: '140px' }}
                />
                <label htmlFor={name}>
                    <IconButton color="primary" variant="outlined" aria-label="upload picture" component="span" size="small">
                        <PhotoCamera />
                    </IconButton>
                </label>
                <Controller
                    name={name}
                    control={control}
                    render={({ field: { onChange, onBlur } }) => (
                        <input
                            {...rest}
                            id={name}
                            onChange={(e) => handleChange(e, onChange)}
                            onBlur={onBlur}
                            type="file"
                            accept="image/*"
                        />
                    )}
                />
                <Typography variant="subtitle2" color="red" component="span">
                    {errors[name]?.message}
                </Typography>
            </div>
            <fslightboxReact toggler={toggler} sources={[image]} />
        </>
    );
};

export default Uploader;
