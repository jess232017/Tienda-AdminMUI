import React, { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import Viewer from 'react-viewer'

import Image from 'mui-image'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import './style.scss'

import { uploadImage } from '@/api'
const NoImage = 'https://res.cloudinary.com/js-media/image/upload/v1653839560/Store-JS/noimage_zpbrke.png'

const Uploader = ({ label, currentSrc = '', upload_preset, ...rest }) => {
    const {
        control,
        formState: { errors },
    } = useFormContext()
    const { name } = rest

    const [viewer, setViewer] = useState(false)
    const [image, setImage] = useState(currentSrc)

    const handleChange = async ({ target: { files } }, onChange) => {
        const [file] = files
        if (file) {
            //const src = URL.createObjectURL(file);
            const response = await uploadImage(file, upload_preset)
            setImage(response.url)
            onChange(response)
        }
    }

    const handleToggle = () => {
        if (image !== '') setViewer(true)
    }

    return (
        <>
            <Box mb={2}>
                <Box component={'label'} label htmlFor={name}>
                    <Box className='css-1wpwbv3'>
                        <div role='presentation' tabIndex={0} className='css-soonpg'>
                            <Controller
                                name={name}
                                control={control}
                                render={({ field: { onChange, onBlur } }) => (
                                    <input
                                        {...rest}
                                        id={name}
                                        onChange={(e) => handleChange(e, onChange)}
                                        onBlur={onBlur}
                                        type='file'
                                        accept='image/*'
                                    />
                                )}
                            />
                            <div className='placeholder css-7zlern'>
                                {image !== '' ? (
                                    <Image
                                        src={image}
                                        fit='cover'
                                        onClick={handleToggle}
                                        wrapperStyle={{ height: '100%', width: '100%' }}
                                    />
                                ) : (
                                    <>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            xmlnsXlink='http://www.w3.org/1999/xlink'
                                            aria-hidden='true'
                                            role='img'
                                            className='MuiBox-root css-v73erd iconify iconify--ic'
                                            sx='[object Object]'
                                            width='1em'
                                            height='1em'
                                            preserveAspectRatio='xMidYMid meet'
                                            viewBox='0 0 24 24'>
                                            <path
                                                fill='currentColor'
                                                d='M3 8c0 .55.45 1 1 1s1-.45 1-1V6h2c.55 0 1-.45 1-1s-.45-1-1-1H5V2c0-.55-.45-1-1-1s-1 .45-1 1v2H1c-.55 0-1 .45-1 1s.45 1 1 1h2v2z'
                                            />
                                            <circle cx={13} cy={14} r={3} fill='currentColor' />
                                            <path
                                                fill='currentColor'
                                                d='M21 6h-3.17l-1.24-1.35A1.99 1.99 0 0 0 15.12 4h-6.4c.17.3.28.63.28 1c0 1.1-.9 2-2 2H6v1c0 1.1-.9 2-2 2c-.37 0-.7-.11-1-.28V20c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5z'
                                            />
                                        </svg>
                                        <span className='MuiTypography-root MuiTypography-caption css-176slt'>
                                            Subir foto
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    </Box>
                </Box>
                <span className='MuiTypography-root MuiTypography-caption css-3mdpyg'>
                    Permitido *.jpeg, *.jpg, *.png, *.gif
                    <br /> tamaño máximo 3.1 MB
                </span>
                <Typography variant='subtitle2' color='red' component='span'>
                    {errors[name]?.message}
                </Typography>
            </Box>
            <Viewer
                visible={viewer}
                onMaskClick={() => {
                    setViewer(false)
                }}
                onClose={() => {
                    setViewer(false)
                }}
                zIndex='1300'
                images={[{ src: image || NoImage, alt: name }]}
            />
        </>
    )
}

export default Uploader
