import React from 'react';

import { styled } from '@mui/system';
import { useTheme } from '@mui/styles';

import {
    useMediaQuery,
    AppBar,
    ClickAwayListener,
    IconButton,
    Grow,
    Paper,
    Popper,
    Toolbar,
    Grid,
} from '@mui/material';

import SearchSection from './SearchSection';
import NotificationSection from './NotificationSection';
import ProfileSection from './ProfileSection';

import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';

const PopperContainer = styled(Popper)({
    width: '100%',
    zIndex: 1,
});

const DivGrow = styled('div')(({ theme }) => ({
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
        flexGrow: 0,
    },
}));

const MobileSection = () => {
    const theme = useTheme();
    const anchorRef = React.useRef(null);
    const [open, setOpen] = React.useState(false);
    const matchMobile = useMediaQuery(theme.breakpoints.down('mobile'));

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
            <IconButton
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                color="inherit"
            >
                <MoreVertTwoToneIcon sx={{ fontSize: '1.5rem' }} />
            </IconButton>
            <PopperContainer
                open={open}
                placement="bottom-end"
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: {
                        offset: {
                            enable: true,
                            offset: '0px, 5px',
                        },
                        preventOverflow: {
                            padding: 0,
                        },
                    },
                }}
            >
                {({ TransitionProps, placement }) => (
                    <Grow {...TransitionProps} in={open}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <DivGrow>
                                    <AppBar color="default">
                                        <Toolbar>
                                            <Grid
                                                container
                                                direction="row"
                                                justify={matchMobile ? 'space-between' : 'flex-end'}
                                                alignItems="center"
                                            >
                                                <SearchSection theme="dark" />
                                                <NotificationSection />
                                                <ProfileSection />
                                            </Grid>
                                        </Toolbar>
                                    </AppBar>
                                </DivGrow>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </PopperContainer>
        </React.Fragment>
    );
};

export default MobileSection;
