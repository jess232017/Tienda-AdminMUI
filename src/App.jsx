import React, { useEffect } from 'react';

import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@mui/material/styles';
import { ConfirmProvider } from 'material-ui-confirm';

import Routes from '@/Routes';
import theme from '@/services/themes/themes';
import useStore from '@/services/context/sidebar';

const App = () => {
    const { show } = useStore();

    useEffect(() => {
        if (show.darkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [show?.darkMode]);

    return (
        <>
            <ThemeProvider theme={theme(show)}>
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
            <ToastContainer theme={show.darkMode ? 'dark' : 'light'} />
        </>
    );
};

export default App;
