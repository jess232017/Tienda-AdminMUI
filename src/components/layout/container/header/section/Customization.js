import React, { useEffect } from 'react';
import { useTheme, useMediaQuery, Box, makeStyles, Tooltip, TextField, MenuItem, InputAdornment, Hidden, Button } from '@material-ui/core';

import TranslateIcon from '@material-ui/icons/Translate';
import Brightness6Icon from '@material-ui/icons/Brightness6';

import useStore from 'src/services/context/sidebar';

const currencies = [
    {
        value: 'es',
        label: 'Español',
    },
    {
        value: 'en',
        label: 'Español',
    },
    {
        value: 'fr',
        label: 'français',
    }
];

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '350px',
        minWidth: '250px',
        backgroundColor: theme.palette.background.paper,
        paddingBottom: 0,
        borderRadius: '10px',
    },
    subHeader: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.common.white,
        padding: '5px 15px',
    },
    menuIcon: {
        fontSize: '1.5rem',
    },
    gridContainer: {
        padding: '10px',
    },
    formContainer: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    menuButton: {
        [theme.breakpoints.down('sm')]: {
            minWidth: '50px',
        },
        [theme.breakpoints.down('xs')]: {
            minWidth: '35px',
        },
    },
    iconSelect: {
        color: '#fff',
        fontSize: '1.4rem',
    },
    selectColor: {
        color: '#fff',
        //padding: '0 !important',
        fontSize: '1rem',
        marginTop: '4px',
        [theme.breakpoints.down('xs')]: {
            fontSize: '0.875rem',
        },
    },
    underlineSelect: {
        ':before': {
            display: 'none',
        },
    },
    selectIcon: {
        marginRight: '4px',
        color: '#fff',
    },
}));

const Customization = () => {
    const theme = useTheme();
    const classes = useStyles();
    const {show, setLocale, setDarkMode} = useStore();
    const matchDownSm = useMediaQuery(theme.breakpoints.down('xs'));

    const [currency, setCurrency] = React.useState(show.locale);

    const handleChange = (event) => {
        setCurrency(event.target.value);
        setLocale(event.target.value);
    };

    if (show.rtlLayout) {
        document.querySelector('body').setAttribute('dir', 'rtl');
    }

    useEffect(() => {
        setCurrency(show.locale);
    }, [show]);

    return (
        <React.Fragment>
            <Tooltip title="Cambiar idioma de la pagina">
                <Box width="80px" ml={matchDownSm ? '8px' : '24px'} mr={matchDownSm ? '8px' : '24px'}>
                    <TextField
                        id="outlined-select-currency"
                        select
                        value={currency}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <Hidden smDown>
                                    <InputAdornment position="start" className={classes.selectIcon}>
                                        <TranslateIcon color="inherit" />
                                    </InputAdornment>
                                </Hidden>
                            ),
                            disableUnderline: true,
                        }}
                        SelectProps={{
                            classes: {
                                select: classes.selectColor,
                                icon: classes.iconSelect,
                            },
                        }}
                    >
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
            </Tooltip>
            <Tooltip title='Modo Obscuro'>
                <Button className={classes.menuButton} color="inherit"
                    onClick={setDarkMode}
                >
                    <Brightness6Icon className={classes.menuIcon} />
                </Button>
            </Tooltip>
        </React.Fragment>
    );
};

export default Customization;
