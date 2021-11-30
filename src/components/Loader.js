import React from 'react';

import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/system';

const DivLoader = styled('div')(({ theme }) => ({
    width: '100%',
    '& > * + *': {
        marginTop: theme.spacing(2),
    },
}));


const Loader = () => {
    return (
        <DivLoader>
            <LinearProgress color="secondary" />
        </DivLoader>
    );
};

export default Loader;
