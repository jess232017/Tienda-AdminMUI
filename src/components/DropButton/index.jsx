import React from 'react';

import Fade from '@mui/material/Fade';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import MenuItem from '_@/components/DropButton/MenuItem';

const DropButton = ({ id, startIcon, endIcon, title, children }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const Icon = endIcon || <KeyboardArrowDownIcon />;

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button size="small"
                endIcon={Icon}
                variant="outlined"
                onClick={handleClick}
                startIcon={startIcon}
                id={`${id}-button`}
                aria-haspopup="true"
                aria-controls={`${id}-button`}
                aria-expanded={open ? 'true' : undefined}
            >
                {title}
            </Button>

            <Menu
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                id={`${id}-menu`}
                MenuListProps={{
                    'aria-labelledby': `${id}-button`,
                }}
                TransitionComponent={Fade}
            >
                {children}
            </Menu>
        </>
    );
}

export { MenuItem };
export default DropButton;
