import React, { useRef, useState } from 'react';

import Avatar from '@mui/material/Avatar';

import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const Preview = styled('div')({
    position: 'relative',
    'label': {
        position: "absolute",
        top: 5,
        right: 5,
        'input': {
            display: 'none',
        },
        'span': {
            color: "white",
            backgroundColor: "#0000001a",
        }
    },
    '.e-upload .e-file-select-wrap': {
        display: 'none'
    },
    '.e-upload': {
        marginTop: -5,
    }
});

const Uploader = ({ src = "" }) => {
    const [image, setImage] = useState(src);
    const uploader = useRef(null);
    const droparea = useRef(null);

    const handleSelect = (e) => {
        const files = validateFiles(e);
        const src = URL.createObjectURL(files[0].rawFile);
        setImage(src);
    }

    const handleChange = ({ target: { files } }) => {
        const [file] = files;
        if (file) {
            const src = URL.createObjectURL(file);
            setImage(src);
            console.log(uploader.current)
        }
    }

    const validateFiles = ({ event, filesData }) => {
        let filesName = [];
        let modifiedFiles = [];
        let validFiles = [];
        let isModified = false;
        if (event.type === 'drop') {
            isModified = true;
            let allImages = ['png', 'jpg', 'jpeg'];
            let files = filesData;
            for (let file of files) {
                if (allImages.indexOf(file.type) !== -1) {
                    modifiedFiles.push(file);
                }
            }
        }
        let files = modifiedFiles.length > 0 || isModified ? modifiedFiles : filesData;
        if (filesName.length > 0) {
            for (let file of files) {
                if (filesName.indexOf(file.name) === -1) {
                    filesName.push(file.name);
                    validFiles.push(file);
                }
            }
        }
        else {
            for (let file of files) {
                filesName.push(file.name);
                validFiles.push(file);
            }
        }
        return validFiles;
    }

    return (
        <>
            <Preview>
                <Avatar variant="rounded"
                    ref={droparea}
                    src={image}
                    sx={{
                        'img': {
                            backgroundColor: "#000",
                            objectFit: "scale-down",
                        },
                        height: '140px', width: "100%"
                    }}
                />
                <label htmlFor="icon-button-file">
                    <input accept="image/*" id="icon-button-file" type="file" onChange={handleChange} />
                    <IconButton color="primary" variant="outlined" aria-label="upload picture" component="span" size='small'>
                        <PhotoCamera />
                    </IconButton>
                </label>

                {/*<UploaderComponent id="uploader"
                    selected={handleSelect}
                    multiple={false}
                    ref={uploader}
                />*/}
            </Preview>


        </>
    );
}

export default Uploader;