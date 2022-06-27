import React, { useEffect } from 'react';

import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@mui/material/styles';
import { ConfirmProvider } from 'material-ui-confirm';

import Routes from '@/Routes';
import theme from '@/services/themes/themes';

//redux
import { useSelector } from 'react-redux';

const App = () => {
    const setting = useSelector((state) => state.app.setting);

    useEffect(() => {
        if (setting.darkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [setting.darkMode]);

    return (
        <>
            <ThemeProvider theme={theme(setting)}>
                <ConfirmProvider
                    defaultOptions={{
                        confirmationButtonProps: { autoFocus: true },
                        dialogProps: {
                            maxWidth: 'xs',
                        },
                    }}
                >
                    <Routes />
                </ConfirmProvider>
            </ThemeProvider>
            <ToastContainer theme={setting.darkMode ? 'dark' : 'light'} />
        </>
    );
};

export default App;
