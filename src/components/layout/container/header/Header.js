import React from 'react';


import { Box, Grid, makeStyles, IconButton, Hidden, Toolbar, AppBar } from '@material-ui/core';
import MenuTwoToneIcon from '@material-ui/icons/MenuTwoTone';

import SearchSection from './section/SearchSection';
import Customization from './section/Customization';
import ProfileSection from './section/ProfileSection';
import NotificationSection from './section/NotificationSection';

import logo from 'src/assets/img/tienda.png';
import { drawerWidth } from 'src/services/constant';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(1.25),
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    menuIcon: {
        fontSize: '1.5rem',
    },
    header: {
        zIndex: 1201,
    },
}));

const Header = ({drawerToggle}) => {
    const classes = useStyles();

    return (
        <AppBar position="fixed" className={classes.header}>
            <Toolbar>
                <Box width={drawerWidth}>
                    <Grid container justify="space-between" alignItems="center">
                        <Hidden smDown>
                            <Grid item>
                                <Box mt={0.5}>
                                    <div style={{display: "flex", gap:".5rem", alignItems:"center"}}>
                                        <img src={logo} alt="Logo" height="35"  />
                                        <span style={{fontWeight: "700", maxWidth:"100px"}}>Abarroteria San Jose</span>
                                    </div>
                                </Box>
                            </Grid>
                        </Hidden>
                        <Grid item>
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="open drawer"
                                onClick={drawerToggle}
                            >
                                <MenuTwoToneIcon className={classes.menuIcon} />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Box>
                <div className={classes.grow} />

                <SearchSection theme="light" />
                <Customization />
                <NotificationSection />
                <ProfileSection />
            </Toolbar>
        </AppBar>
    );
};

export default Header;
