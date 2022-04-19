import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

//import fslightboxReact from 'fslightbox-react';
//import FsLightbox from 'fslightbox-react';
import ImgsViewer from 'react-images-viewer';

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

    const [viewer, setViewer] = useState(false);
    const [image, setImage] = useState(currentSrc);

    const handleChange = async ({ target: { files } }, onChange) => {
        const [file] = files;
        if (file) {
            const src = URL.createObjectURL(file);
            setImage(src);
            const response = await uploadImage(file);
            onChange(response);
        }
    };

    const handleToggle = () => {
        if (image !== '') setViewer(true);
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
            <ImgsViewer imgs={[{ src: image }]} isOpen={viewer} onClose={() => setViewer(false)} />
        </>
    );
};

export default Uploader;
