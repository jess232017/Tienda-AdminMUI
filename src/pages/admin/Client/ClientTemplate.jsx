import React from 'react';

import Viewer from 'react-viewer';
import { Avatar, Box, Stack, Typography } from '@mui/material';
const NoImage = 'https://res.cloudinary.com/js-media/image/upload/v1653839560/Store-JS/noimage_zpbrke.png';

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

            <Viewer
                visible={viewer}
                onClose={() => {
                    setViewer(false);
                }}
                zIndex="1300"
                images={[{ src: image || NoImage, alt: name }]}
            />
        </Box>
    );
};

export default ClientTemplate;
