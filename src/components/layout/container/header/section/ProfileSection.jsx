import React from 'react';

import { styled } from '@mui/system';
import { makeStyles } from '@mui/styles';
import { Fade, Button, ClickAwayListener, Paper, Popper, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSignOut } from 'react-auth-kit'

import PersonTwoToneIcon from '@mui/icons-material/PersonTwoTone';
import DraftsTwoToneIcon from '@mui/icons-material/DraftsTwoTone';
import LockOpenTwoTone from '@mui/icons-material/LockOpenTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import MeetingRoomTwoToneIcon from '@mui/icons-material/MeetingRoomTwoTone';

const ListRoot = styled(List)(({ theme }) => ({
    width: '100%',
    paddingBottom: 0,
    maxWidth: '350px',
    minWidth: '250px',
    borderRadius: '10px',
    backgroundColor: theme.palette.background.paper,
}));

const ProfileSection = () => {
    const signOut = useSignOut();

    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        if (index === 4) {
            //handleLogout;
            signOut();
        }
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <React.Fragment>
            <Button
                ref={anchorRef}
                sx={{ minWidth: { xs: '35px', sm: '50px', md: '65px' } }}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                color="inherit"
            >
                <AccountCircleTwoToneIcon sx={{ fontSize: '1.5rem' }} />
            </Button>
            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                disablePortal={true}
                role={undefined}
                transition
                popperOptions={{
                    modifiers: [{
                        name: "Pefil",
                        enabled: true,
                        phase: 'main',
                        options: {
                            offset: {
                                enable: true,
                                offset: '0px, 10px',
                            },
                            preventOverflow: {
                                padding: 0,
                            },
                        },
                        fn({ state }) {
                            if (state.placement === 'top') {
                                console.log('Popper is on the top');
                            }
                        },
                    }]
                }}
            >
                {({ TransitionProps, placement }) => (
                    <Fade {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <ListRoot component="nav">
                                    <ListItem
                                        button
                                        component={Link}
                                        to="/admin/setting"
                                        selected={selectedIndex === 1}
                                        onClick={(event) => handleListItemClick(event, 1)}
                                    >
                                        <ListItemIcon>
                                            <SettingsTwoToneIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Configuracion" />
                                    </ListItem>
                                    <ListItem
                                        button
                                        component={Link}
                                        to="/user/profile"
                                        selected={selectedIndex === 2}
                                        onClick={(event) => handleListItemClick(event, 2)}
                                    >
                                        <ListItemIcon>
                                            <PersonTwoToneIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Perfil" />
                                    </ListItem>
                                    <ListItem button selected={selectedIndex === 3} onClick={(event) => handleListItemClick(event, 3)}>
                                        <ListItemIcon>
                                            <DraftsTwoToneIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Mis Mensajes" />
                                    </ListItem>
                                    <ListItem button selected={selectedIndex === 4} onClick={(event) => handleListItemClick(event, 4)}>
                                        <ListItemIcon>
                                            <LockOpenTwoTone />
                                        </ListItemIcon>
                                        <ListItemText primary="Bloquear Pantalla" />
                                    </ListItem>
                                    <ListItem
                                        button
                                        selected={selectedIndex === 4}
                                        onClick={(event) => handleListItemClick(event, 4)}
                                    >
                                        <ListItemIcon>
                                            <MeetingRoomTwoToneIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Cerrar Sesion" />
                                    </ListItem>
                                </ListRoot>
                            </ClickAwayListener>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </React.Fragment>
    );
};

export default ProfileSection;
