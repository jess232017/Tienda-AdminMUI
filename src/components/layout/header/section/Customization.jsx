import React, { useEffect, useState } from 'react';

import { styled } from '@mui/system';
import { useTheme } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import { useMediaQuery, Box, Tooltip, TextField, MenuItem, InputAdornment, Hidden, Button } from '@mui/material';

import TranslateIcon from '@mui/icons-material/Translate';
import BrightnessIcon from '@mui/icons-material/Brightness6Outlined';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { setLocale, setDarkMode } from '@/store/features/appSlice';

const currencies = [
    {
        value: 'en',
        label: 'English',
    },
    {
        value: 'es',
        label: 'Español',
    },
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
    //redux
    const dispatch = useDispatch();
    const setting = useSelector((state) => state.app.setting);

    const theme = useTheme();
    const { i18n } = useTranslation();
    const matchDownSm = useMediaQuery(theme.breakpoints.down('xs'));

    const handleLanguage = ({ target }) => {
        dispatch(setLocale({ value: target.value, label: 'Hi' }));
        i18n.changeLanguage(target.value);
    };

    const handleDarkMode = () => {
        dispatch(setDarkMode(!setting.darkMode));
    };

    return (
        <React.Fragment>
            <Box width="80px" ml={matchDownSm ? '8px' : '24px'} mr={matchDownSm ? '8px' : '24px'}>
                <TextField
                    select
                    value={setting.Locale}
                    onChange={handleLanguage}
                    variant="standard"
                    InputProps={{
                        startAdornment: (
                            <Hidden smDown>
                                <SelectIcon position="start">
                                    <TranslateIcon color="inherit" />
                                </SelectIcon>
                            </Hidden>
                        ),
                        disableUnderline: true,
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
            <Tooltip title="Modo Obscuro">
                <Button color="inherit" onClick={handleDarkMode} sx={{ minWidth: { xs: '35px', sm: '50px', md: '65px' } }}>
                    <MenuIcon />
                </Button>
            </Tooltip>
        </React.Fragment>
    );
};

export default Customization;
