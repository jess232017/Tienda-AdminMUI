import React from 'react';
import Viewer from 'react-viewer';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import { Avatar, Box, Stack, Typography } from '@mui/material';
const NoImage = 'https://res.cloudinary.com/js-media/image/upload/v1653839560/Store-JS/noimage_zpbrke.png';

const ProductTemplate = ({ row }) => {
    const [viewer, setViewer] = React.useState(false);
    const { image, name, description } = row;

    return (
        <Box width="100%" display="flex">
            <Avatar alt={name} src={image} variant="rounded" onClick={() => setViewer(true)}>
                <LabelImportantIcon />
            </Avatar>
            <Stack ml={2}>
                <Typography variant="subtitle1">{name}</Typography>
                <Typography variant="caption">{description}</Typography>
            </Stack>
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
        </Box>
    );
};

export default ProductTemplate;
