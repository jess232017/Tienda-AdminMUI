import React from 'react';

import { Tooltip, Typography } from '@mui/material';

const Truncable = ({text, length}) => {
    const truncar = (str) => {
        return str.length > length ? str.substring(0, length - 3) + "..." : str;
    }

    return ( 
        <Tooltip title={text}>
            <Typography>{truncar(text)}</Typography>
        </Tooltip>
    );
}
 
export default Truncable;