import React from 'react';
import clsx from 'clsx';

import { styled } from '@mui/system';
import { makeStyles, useTheme } from '@mui/styles';
import Toolbar from '@mui/material/Toolbar';
import {  useMediaQuery, CssBaseline, Box } from '@mui/material';

import { drawerWidth } from 'src/services/constant';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import Content from './content/Content';

const Main = styled('div')(({ theme }) => ({
    padding: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(3),
    },
}));

const Div = styled('div')(({ theme }) => ({
    width: '100%',
    minHeight: '100vh',
    flexGrow: 1,
    /*padding: theme.spacing(3),*/
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up('md')]: {
        marginLeft: -drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
    },
}));

const useStyles = makeStyles((theme) => ({
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

const MainLayout = () => {
    const classes = useStyles();
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    React.useEffect(() => {
        setDrawerOpen(matchUpMd);
    }, [matchUpMd]);

    return (
        <Box display="flex">
            <CssBaseline />
            <Sidebar drawerOpen={drawerOpen} drawerToggle={handleDrawerToggle} />
            <Div className={clsx( { [classes.contentShift]: drawerOpen })}>
                <Toolbar>
                    <Header drawerOpen={drawerOpen} drawerToggle={handleDrawerToggle} />
                </Toolbar>
                <Main>
                    <Content/>
                </Main>
            </Div>
        </Box>
    );
};

export default MainLayout;
