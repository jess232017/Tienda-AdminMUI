import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import Viewer from 'react-viewer';

import Image from 'mui-image';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import { uploadImage } from '@/api';
const NoImage = 'https://res.cloudinary.com/js-media/image/upload/v1653839560/Store-JS/noimage_zpbrke.png';

const Uploader = ({ label, currentSrc = '', upload_preset, ...rest }) => {
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
            //const src = URL.createObjectURL(file);
            const response = await uploadImage(file, upload_preset);
            setImage(response.url);
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
            <Viewer
                visible={viewer}
                onMaskClick={() => {
                    setViewer(false);
                }}
                onClose={() => {
                    setViewer(false);
                }}
                zIndex="1300"
                images={[{ src: image || NoImage, alt: name }]}
            />
        </>
    );
};

export default Uploader;
