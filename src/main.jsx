import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { AuthProvider } from 'react-auth-kit';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';

//Theme
import 'react-toastify/dist/ReactToastify.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'sweetalert2/src/sweetalert2.scss';
import '@/assets/scss/style.scss';

const queryClient = new QueryClient();

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider
            authType={'cookie'}
            authName={'_auth'}
            cookieDomain={window.location.hostname}
            cookieSecure={window.location.protocol === 'https:'}
        >
            <QueryClientProvider client={queryClient}>
                <App />
                <ReactQueryDevtools />
            </QueryClientProvider>
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
