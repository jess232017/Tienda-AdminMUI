import React from 'react';
import clsx from 'clsx';
import { makeStyles, useMediaQuery, useTheme, CssBaseline } from '@material-ui/core';

import { drawerWidth } from 'src/services/constant';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import Content from './content/Content';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    toolbar: theme.mixins.toolbar,
    content: {
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
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    main: {
        padding: theme.spacing(5),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(3),
        },
    },
}));

const MainLayout = ({ children }) => {
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
        <div className={classes.root}>
            <CssBaseline />
            <Sidebar drawerOpen={drawerOpen} drawerToggle={handleDrawerToggle} />
            <main className={clsx(classes.content, { [classes.contentShift]: drawerOpen })}>
                <div className={classes.toolbar}>
                    <Header drawerOpen={drawerOpen} drawerToggle={handleDrawerToggle} />
                </div>
                <div className={classes.main}>
                    <Content/>
                </div>
            </main>
        </div>
    );
};

export default MainLayout;
