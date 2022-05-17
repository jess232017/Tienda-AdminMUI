import React, { useState, useEffect } from 'react';

import { IntlProvider } from 'react-intl';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@mui/material/styles';
import { ConfirmProvider } from 'material-ui-confirm';

import Routes from '@/Routes';
import theme from '@/services/themes/themes';
import useStore from '@/services/context/sidebar';
import location from '@/services/locales/locales-map';

const App = () => {
    const { show } = useStore();
    const [messages, setMessages] = useState();

    useEffect(() => {
        location[show.locale].then((d) => setMessages(d.default));
    }, [show]);

    useEffect(() => {
        console.log(show);
        if (show.darkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [show?.darkMode]);

    return (
        <>
            {messages && (
                <IntlProvider locale={show.locale} defaultLocale="es" messages={messages}>
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
                </IntlProvider>
            )}
        </>
    );
};

export default App;
