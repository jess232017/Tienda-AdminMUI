import React from 'react';

import { styled } from '@mui/system';

import {    
    Button,
    Chip,
    ClickAwayListener,
    Fade,
    Grid,
    Paper,
    Popper,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListSubheader,
    ListItemSecondaryAction,
    Typography,
} from '@mui/material';

import PerfectScrollbar from 'react-perfect-scrollbar';
import QueryBuilderTwoToneIcon from '@mui/icons-material/QueryBuilderTwoTone';

import NotificationsNoneTwoToneIcon from '@mui/icons-material/NotificationsNoneTwoTone';

import User1 from 'src/assets/images/users/avatar-1.jpg';
import User2 from 'src/assets/images/users/avatar-2.jpg';
import User3 from 'src/assets/images/users/avatar-3.jpg';
import User4 from 'src/assets/images/users/avatar-4.jpg';

const ListAction = styled(ListItemSecondaryAction)({
    top: '22px',
});

const ListRoot = styled(List)(({ theme }) => ({
    width: '100%',
    maxWidth: '350px',
    minWidth: '250px',
    paddingBottom: 0,
    borderRadius: '10px',
    backgroundColor: theme.palette.background.paper,
}));

const ActionIcon = styled(QueryBuilderTwoToneIcon)(({theme}) => ({
    fontSize: '0.75rem',
    marginRight: '4px',
    color: theme.palette.grey[400],
}));

const ActionColor = styled(Typography)(({theme}) => ({
    color: theme.palette.grey[400],
}));

const NotificationSection = () => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

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
                sx={{minWidth: { xs: '35px', sm: '50px', md: '65px'}}}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                color="inherit"
            >
                <NotificationsNoneTwoToneIcon sx={{ fontSize: '1.5rem' }} />
            </Button>
            <Popper
                open={open}
                disablePortal={true}
                placement="bottom-end"
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                popperOptions={{
                    modifiers: [{
                        name: "Notificacion",
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
                    }],
                }}
            >
                {({ TransitionProps, placement }) => (
                    <Fade {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <ListRoot>
                                    <PerfectScrollbar style={{height: '320px', overflowX: 'hidden'}}>
                                        <ListSubheader disableSticky>
                                            <Chip size="small" color="primary" label="New" />
                                        </ListSubheader>
                                        <ListItem button alignItems="flex-start" sx={{ paddingTop: 0 }}>
                                            <ListItemAvatar>
                                                <Avatar alt="John Doe" src={User1} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={<Typography variant="subtitle1">John Doe</Typography>}
                                                secondary={<Typography variant="subtitle2">New ticket Added</Typography>}
                                            />
                                            <ListAction>
                                                <Grid container justify="flex-end">
                                                    <Grid item>
                                                        <ActionIcon />
                                                    </Grid>
                                                    <Grid item>
                                                        <ActionColor
                                                            variant="caption"
                                                            display="block"
                                                            gutterBottom
                                                        >
                                                            now
                                                        </ActionColor>
                                                    </Grid>
                                                </Grid>
                                            </ListAction>
                                        </ListItem>
                                        <ListSubheader disableSticky>
                                            <Chip size="small" variant="outlined" label="EARLIER" />
                                        </ListSubheader>
                                        <ListItem button alignItems="flex-start" sx={{ paddingTop: 0 }}>
                                            <ListItemAvatar>
                                                <Avatar alt="Joseph William" src={User2} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={<Typography variant="subtitle1">Joseph William</Typography>}
                                                secondary={<Typography variant="subtitle2">Purchase a new product</Typography>}
                                            />
                                            <ListAction>
                                                <Grid container justify="flex-end">
                                                    <Grid item>
                                                        <ActionIcon />
                                                    </Grid>
                                                    <Grid item>
                                                        <ActionColor
                                                            variant="caption"
                                                            display="block"
                                                            gutterBottom
                                                        >
                                                            10 min
                                                        </ActionColor>
                                                    </Grid>
                                                </Grid>
                                            </ListAction>
                                        </ListItem>
                                        <ListItem button alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar alt="Sara Soudein" src={User3} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={<Typography variant="subtitle1">Sara Soudein</Typography>}
                                                secondary={<Typography variant="subtitle2">Currently Login</Typography>}
                                            />
                                            <ListAction>
                                                <Grid container justify="flex-end">
                                                    <Grid item>
                                                        <ActionIcon />
                                                    </Grid>
                                                    <Grid item>
                                                        <ActionColor
                                                            variant="caption"
                                                            display="block"
                                                            gutterBottom
                                                        >
                                                            12 min
                                                        </ActionColor>
                                                    </Grid>
                                                </Grid>
                                            </ListAction>
                                        </ListItem>
                                        <ListItem button alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar alt="Sepha Wilon" src={User4} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={<Typography variant="subtitle1">Sepha Wilon</Typography>}
                                                secondary={<Typography variant="subtitle2">Purchase a new product</Typography>}
                                            />
                                            <ListAction>
                                                <Grid container justify="flex-end">
                                                    <Grid item>
                                                        <ActionIcon />
                                                    </Grid>
                                                    <Grid item>
                                                        <ActionColor
                                                            variant="caption"
                                                            display="block"
                                                            gutterBottom
                                                        >
                                                            30 min
                                                        </ActionColor>
                                                    </Grid>
                                                </Grid>
                                            </ListAction>
                                        </ListItem>
                                    </PerfectScrollbar>
                                </ListRoot>
                            </ClickAwayListener>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </React.Fragment>
    );
};

export default NotificationSection;
