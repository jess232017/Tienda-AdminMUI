import React from 'react'
import { render } from 'react-dom'
import App from './App'

import { Provider } from 'react-redux'
import { AuthProvider } from 'react-auth-kit'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
//import { ReactNotifications, Store } from 'react-notifications-component'
//import ReactNotifications from 'react-notifications-component';

//store
import store from './store/store'

//languages
import './services/locales/i18n'

//Theme
import 'animate.css/animate.min.css'
import 'simplebar/dist/simplebar.min.css'
import 'react-phone-input-2/lib/high-res.css'
import 'react-perfect-scrollbar/dist/css/styles.css'
import 'pure-react-carousel/dist/react-carousel.es.css'
import 'vanilla-icon-picker/dist/themes/default.min.css' // 'default' theme
//import 'react-notifications-component/dist/theme.css'
import '@/assets/scss/style.scss'

const queryClient = new QueryClient()
const container = document.getElementById('root')

const root = document.getElementById('root')
render(
    <React.StrictMode>
        <AuthProvider
            authType={'cookie'}
            authName={'_auth'}
            cookieDomain={window.location.hostname}
            cookieSecure={window.location.protocol === 'https:'}>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <ReactQueryDevtools />
                    <App />
                </QueryClientProvider>
            </Provider>
        </AuthProvider>
    </React.StrictMode>,
    root,
)
