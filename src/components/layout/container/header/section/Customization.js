import React, { useEffect } from 'react';

import { styled } from '@mui/system';
import { useTheme } from '@mui/styles';
import { useMediaQuery, Box,  Tooltip, TextField, MenuItem, InputAdornment, Hidden, Button } from '@mui/material';

import TranslateIcon from '@mui/icons-material/Translate';
import BrightnessIcon from '@mui/icons-material/Brightness6Outlined';

import useStore from 'src/services/context/sidebar';

const currencies = [
    {
        value: 'en',
        label: 'English',
    },
    {
        value: 'es',
        label: 'Español',
    },
    {
        value: 'fr',
        label: 'français',
    }
];

const MenuIcon = styled(BrightnessIcon)({
    flexGrow: 1,
    fontSize: '1.5rem',
});

const SelectIcon = styled(InputAdornment)({
    marginRight: '4px',
    color: '#fff',
});

const Customization = () => {
    const theme = useTheme();
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
                        variant="standard"
                        InputProps={{
                            startAdornment: (
                                <Hidden smDown>
                                    <SelectIcon position="start">
                                        <TranslateIcon color="inherit" />
                                    </SelectIcon>
                                </Hidden>
                            ),
                            disableUnderline: true
                        }}
                        SelectProps={{
                            classes: {
                                select: 'mui-select-color',
                                icon: 'mui-icon-select',
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
                <Button color="inherit"
                    onClick={setDarkMode}
                    sx={{minWidth: { xs: '35px', sm: '50px', md: '65px'}}}
                >
                    <MenuIcon/>
                </Button>
            </Tooltip>
        </React.Fragment>
    );
};

export default Customization;
