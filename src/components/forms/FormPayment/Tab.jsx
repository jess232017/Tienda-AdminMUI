import React from 'react';

import { styled } from '@mui/material';
import MuiTab from '@mui/material/Tab';
import MuiTabs from '@mui/material/Tabs';

const Tab = styled(MuiTab)({
    minHeight: 43,
    fontSize: '0.8rem',
    textTransform: 'capitalize'
})

const Tabs = styled(MuiTabs)({
    minHeight: 43,
    '.MuiTabs-scrollButtons.Mui-disabled': {
        opacity: 0.3
    }
})

export { Tab, Tabs };