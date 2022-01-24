import React from 'react';

import { styled } from '@mui/system';
import { Box, Grid,  IconButton, Toolbar, AppBar } from '@mui/material';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';

import SearchSection from './section/SearchSection';
import Customization from './section/Customization';
import ProfileSection from './section/ProfileSection';
import NotificationSection from './section/NotificationSection';

import logo from '_@/assets/img/tienda.png';
import { drawerWidth } from '_@/services/constant';

const Grow = styled('div')({
    flexGrow: 1,
});

const MenuButton = styled(IconButton)(({ theme }) => ({
    marginRight: theme.spacing(1.25),
}));

const Header = ({drawerToggle}) => {

    return (
        <AppBar position="fixed" sx={{zIndex: { xs: 1000, md: 1201}}}>
            <Toolbar>
                <Box width={drawerWidth}>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item
                            sx={{ display: { xs: 'none' , md: 'block' }}}
                        >
                            <Box mt={0.5}>
                                <div style={{display: "flex", gap:".5rem", alignItems:"center"}}>
                                    <img src={logo} alt="Logo" height="35"  />
                                    <span style={{fontWeight: "700", maxWidth:"100px"}}>Abarroteria San Jose</span>
                                </div>
                            </Box>
                        </Grid>
                        <Grid item>
                            <MenuButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={drawerToggle}
                            >
                                <MenuTwoToneIcon sx={{ fontSize: '1.5rem' }}/>
                            </MenuButton>
                        </Grid>
                    </Grid>
                </Box>
                <Grow/>

                <SearchSection theme="light" />
                <Customization />
                <NotificationSection />
                <ProfileSection />
            </Toolbar>
        </AppBar>
    );
};

export default Header;
