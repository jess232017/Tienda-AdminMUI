import React from 'react';
import Box from '@mui/material/Box';

const TabPanel = ({ children, value, index, ...other }) => {
    return (
        <Box
            sx={{ minHeight: '295px' }}
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && <>{children}</>}
        </Box>
    );
};

export default TabPanel;
