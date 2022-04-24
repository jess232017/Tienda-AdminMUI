import React from 'react';
import ImgsViewer from 'react-images-viewer';
import { Avatar, Box, Stack, Typography } from '@mui/material';

const ClientTemplate = ({ row }) => {
    const [viewer, setViewer] = React.useState(false);
    const { image, firstName, lastName, email } = row;
    return (
        <Box width="100%" display="flex">
            <Avatar alt={firstName} src={image} variant="circular" onClick={() => setViewer(true)} />
            <Stack ml={2}>
                <Typography variant="subtitle1">{`${firstName} ${lastName}`}</Typography>
                <Typography variant="caption">{email}</Typography>
            </Stack>

            <ImgsViewer imgs={[{ src: image }]} isOpen={viewer} onClose={() => setViewer(false)} />
        </Box>
    );
};

export default ClientTemplate;
