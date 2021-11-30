import React from 'react';

//Responsive
import  {PriorityNav, ToggleButton } from 'react-priority-navigation';
import { usePopupState, bindTrigger, bindMenu } from 'material-ui-popup-state/hooks'

//Mui
import styled from '@mui/material/styles/styled';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiToolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';

//Icon
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PictureInPictureIcon from '@mui/icons-material/PictureInPicture';


//Owned
import Search from 'src/components/Toolbar/Search';
import MenuItem from 'src/components/Toolbar/MenuItem';
import GroupItem from 'src/components/Toolbar/GroupItem';

const MyToolbar = styled(MuiToolbar)(({ theme }) => ({
    padding: 0,
    minHeight: 0,
    marginBottom: '10px',
    maxHeight: '36.67px',
    [theme.breakpoints.up('sm')]: {
        padding: 0,
    },
}));

const ButtonItem = styled(Button)({
    marginRight: 3,
    textTransform: 'none',
    maxHeight: '36.67px',
    minWidth: 'auto',
});

const MyIconButton = styled(Button)(({ theme }) => ({
    border: '1px solid rgba(51, 102, 255, 0.5)',
    textTransform: 'none',
    padding: '10px 0px',
    marginRight: 3,
    minWidth: '40px',
    maxHeight: '36.67px',
    ' svg': {
        fontSize: "1rem"
    },
    '&:hover': {
        border: '1px solid ' + theme.palette.primary.main,
    },
}));

const Toolbar = ({items}) => {
    const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' })

    return ( 
        <MyToolbar variant="dense"> 
            <PriorityNav
                dropdown={({ dropdownItems, buttonProps }) => (
                    <>
                        <MyIconButton color="primary"
                            aria-label="mas opciones"
                            {...buttonProps.bind} {...bindTrigger(popupState)} 
                        >
                            <MoreVertIcon />
                        </MyIconButton>
                        <Menu {...bindMenu(popupState)}>
                            {dropdownItems.map((item, i) => 
                                <MenuItem key={i} {...item.props} />)
                            }
                        </Menu>
                    </>
                )}
            >

                {items.map(value => {
                    return value.type === 'item' ?
                        <ButtonItem variant="outlined"
                            key={value?.id}
                            onClick={value?.fn}
                            startIcon={value?.icon}
                        >
                            {value?.title}
                        </ButtonItem>
                    :
                        <GroupItem
                            key={value?.id}
                            value={value}
                        />
                })}
            </PriorityNav>;


           
            
            <Box sx={{ flexGrow: 1 }} />

            <MyIconButton color="primary" aria-label="hide rows">
                <PictureInPictureIcon />
            </MyIconButton>
            <Search/>
                
        </MyToolbar>
    );
}

/*
    id: , title: , type:, icon: , url: ,
*/

const item = (id, title, type, icon, fn) => ({id, title, type, icon, fn});

export {item};
export default Toolbar;