import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import { IntlProvider } from 'react-intl';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Loader from 'src/components/Loader';
import theme from 'src/services/themes/themes';
import useStore from 'src/services/context/sidebar';
import location from 'src/services/locales/locales-map';
import useHeaderJwt from 'src/services/hooks/useHeaderJwt';


//Theme
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import './assets/css/dx.generic.ecommerce-scheme.css'
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'src/assets/scss/style.scss'

//Pages
const Layout = React.lazy(() => import('./components/layout/container/Layout'))
const Auth = React.lazy(() => import('./views/auth/Auth'));

const App = () => {
    const { show } = useStore();
    const [messages, setMessages] = useState();
    const { isAuthenticated, isExpired } = useHeaderJwt();
    let expired = isExpired() & isAuthenticated() ? true : false;

    useEffect(() => {
        location[show.locale].then(d => setMessages(d.default));
    }, [show]);

    return (
        <HashRouter>
            {messages && (
                <IntlProvider locale={show.locale} defaultLocale="es" messages={messages}>
                    <CssBaseline />
                    <ThemeProvider theme={theme(show)}>
                        <React.Suspense fallback={<Loader />}>
                            <Switch>
                                <Route exact path="/auth/login" name="Ingresar">
                                    {isAuthenticated() && !expired ? <Redirect to="/" /> : <Auth isExpired={expired} />}
                                </Route>

                                <Route exact path="/auth/sign-up" name="Registrase">
                                    {isAuthenticated() && !expired ? <Redirect to="/" /> : <Auth isExpired={expired} />}
                                </Route>

                                <Route path="/" name="Inicio">
                                    {isAuthenticated() && !expired ? <Layout /> : <Redirect to="/auth/login" />}
                                </Route>
                            </Switch>
                        </React.Suspense>
                    </ThemeProvider>
                </IntlProvider>
            )}
        </HashRouter>
    );
};

export default App;
