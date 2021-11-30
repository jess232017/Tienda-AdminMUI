import React from 'react';


import { styled } from '@mui/system';
import { useTheme } from '@mui/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {  useMediaQuery, Divider, Drawer, Grid, Toolbar, Box } from '@mui/material';

import MenuList from './menuList/MenuList';

import logo from 'src/assets/img/tienda.png';
import { drawerWidth } from 'src/services/constant';

const NavResponsive = styled('nav')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        width: drawerWidth,
        flexShrink: 0,
    },
}));

const ToolContainer = styled(Toolbar)(({ theme }) => ({
    lineHeight: 0,
    background: theme.palette.primary.main,
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    justifyContent: "center",
    alignItems: "center",
    gap:".5rem",
}));

const ScrollHeight = styled(PerfectScrollbar)({
    height: 'calc(100vh - 65px)',
    padding: '10px',
});

const MainLayout = (props) => {
    const { drawerOpen, drawerToggle, window } = props;
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

    const drawer = (
        <React.Fragment>
            <ToolContainer
                sx={{display: { xs: 'flex', md: 'none'}}}
            >
                <img src={logo} alt="Logo" height="35"  />
                <span style={{fontWeight: "700", color: '#fff'}}>Abarroteria San Jose</span>
            </ToolContainer>
            <Divider />
            <ScrollHeight>
                <MenuList />
            </ScrollHeight>
        </React.Fragment>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <NavResponsive aria-label="mailbox folders">
            <Drawer
                anchor="left"
                open={drawerOpen}
                container={container}
                onClose={drawerToggle}
                classes={{ paper: 'drawer-paper-light' }}
                variant={matchUpMd ? 'persistent' : 'temporary'}
                ModalProps={{ keepMounted: true }}
            >
                {drawer}
            </Drawer>
        </NavResponsive>
    );
};

export default MainLayout;
