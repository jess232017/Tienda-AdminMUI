import React from 'react'

import MuiMenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

const MenuItem = ({ onClick, startIcon, children }) => {
    return (
        <MuiMenuItem onClick={onClick}
        >
            <ListItemIcon>
                {startIcon}
            </ListItemIcon>
            <ListItemText>
                {children}
            </ListItemText>
        </MuiMenuItem>
    );
}

export default MenuItem;