import React from 'react';

import { styled } from '@mui/material/styles';

import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const ButtonItem = styled(Button)({
    marginRight: 3,
    textTransform: 'none'
});

const GroupItem = ({value, icon = <KeyboardArrowDownIcon/>}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <ButtonItem variant="outlined"
                onClick={handleClick}
                startIcon={value?.icon}
                endIcon={icon}
                id={`${value?.id}-button`}
                aria-haspopup="true"
                aria-controls={`${value?.id}-button`}
                aria-expanded={open ? 'true' : undefined}
            >
                {value?.title}
            </ButtonItem>

            <Menu
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                id={`${value?.id}-menu`}
                MenuListProps={{
                    'aria-labelledby': `${value?.id}-button`,
                }}
                TransitionComponent={Fade}
            >
                {value?.fn.map(valueItem =>(
                    <MenuItem
                        key={valueItem?.id}
                        onClick={valueItem?.fn}
                    >
                        <ListItemIcon>
                            {valueItem?.icon}
                        </ListItemIcon>
                        <ListItemText>{valueItem?.title}</ListItemText>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}
 
export default GroupItem;