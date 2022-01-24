import React, { useState, useEffect } from 'react';

import { IntlProvider } from 'react-intl';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Routes from '_@/Routes';
import theme from '_@/services/themes/themes';
import useStore from '_@/services/context/sidebar';
import location from '_@/services/locales/locales-map';

const App = () => {
  const { show } = useStore();
  const [messages, setMessages] = useState();

  useEffect(() => {
    location[show.locale].then(d => setMessages(d.default));
  }, [show]);

  return (
    <>
      {messages && (
        <IntlProvider locale={show.locale} defaultLocale="es" messages={messages}>
          <CssBaseline />
          <ThemeProvider theme={theme(show)}>
            <Routes />
          </ThemeProvider>
        </IntlProvider>
      )}
    </>
  );
};

export default App
