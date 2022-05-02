import React from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
    return (
        <Box display="flex" width="100%" height="100%" justifyContent="center" alignItems="center">
            <CircularProgress />
        </Box>
    );
};

export default Loader;
