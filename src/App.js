import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import { IntlProvider } from 'react-intl';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Loader from 'src/components/Loader';
import theme from 'src/services/themes/themes';
import useStore from 'src/services/context/sidebar';
import location from 'src/services/locales/locales-map';

import useHeaderJwt from './services/hooks/useHeaderJwt';
import Expired from './views/auth/Expired';

//Theme
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import './assets/css/dx.generic.ecommerce-scheme.css'
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'src/assets/scss/style.scss'

const Layout = React.lazy(() => import('./components/layout/container/Layout'))
const Auth = React.lazy(() => import('./views/auth/Auth'));

const App = () => {
    const {show} = useStore();
    const [messages, setMessages] = useState();
    const {isAuthenticated, exp: expiresIn} = useHeaderJwt();

    useEffect(() => {
        location[show.locale].then( d => setMessages(d.default));
    }, [show]);

    if(isAuthenticated && expiresIn * 1000  < Date.now()){
        return<Expired/>
    }

    return (
        <HashRouter>
            {messages && (
                <IntlProvider locale={show.locale} defaultLocale="es" messages={messages}>
                    <CssBaseline />
                    <ThemeProvider theme={theme(show)}>
                        <React.Suspense fallback={<Loader/>}>
                            <Switch>
                                <Route exact path="/login" name="Ingresar">
                                    {isAuthenticated ? <Layout /> : <Auth/> }
                                </Route>
                                
                                <Route exact path="/sign-up" name="Registrase">
                                    {isAuthenticated ? <Layout /> : <Auth/> }
                                </Route>
                                
                                <Route path="/" name="Inicio">
                                    {isAuthenticated ? <Layout /> : <Redirect to="/login" /> }
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
