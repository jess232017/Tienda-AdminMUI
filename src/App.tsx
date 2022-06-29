import React, { useEffect } from 'react';

import { ThemeProvider } from '@mui/material/styles';

import Routes from '@/Routes';
import theme from '@/services/themes/themes';

//redux
import { useSelector } from 'react-redux';

const App = () => {
    const setting = useSelector((state) => state.app.setting);

    useEffect(() => {
        if (setting.darkMode) {
            document.body.classList.add('dark');
            document.documentElement.style.colorScheme = 'dark';
        } else {
            document.body.classList.remove('dark');
            document.documentElement.style.colorScheme = 'light';
        }
    }, [setting.darkMode]);

    return (
        <ThemeProvider theme={theme(setting)}>
            <Routes />
        </ThemeProvider>
    );
};

export default App;
