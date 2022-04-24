import React from 'react';
import ImgsViewer from 'react-images-viewer';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import { Avatar, Box, Stack, Typography } from '@mui/material';

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

            <ImgsViewer imgs={[{ src: image }]} isOpen={viewer} onClose={() => setViewer(false)} />
        </Box>
    );
};

export default ProductTemplate;
