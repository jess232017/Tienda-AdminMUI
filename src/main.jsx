import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { SnackbarProvider } from 'notistack';
import { AuthProvider } from 'react-auth-kit';
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from 'react-query';
import NiceModal from '@ebay/nice-modal-react';

//Theme
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import '_@/assets/scss/style.scss';

import '../node_modules/@syncfusion/ej2-react-grids/styles/material.css';
import '../node_modules/@syncfusion/ej2-base/styles/material.css';
import '../node_modules/@syncfusion/ej2-buttons/styles/material.css';
import '../node_modules/@syncfusion/ej2-calendars/styles/material.css';
import '../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';
import '../node_modules/@syncfusion/ej2-inputs/styles/material.css';
import '../node_modules/@syncfusion/ej2-navigations/styles/material.css';
import '../node_modules/@syncfusion/ej2-popups/styles/material.css';
import '../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
import "../node_modules/@syncfusion/ej2-react-grids/styles/material.css";
import '../node_modules/@syncfusion/ej2-react-navigations/styles/material.css';

const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider authType={'cookie'}
      authName={'_auth'}
      cookieDomain={window.location.hostname}
      cookieSecure={window.location.protocol === "https:"}
    >
      <QueryClientProvider client={queryClient}>
        <NiceModal.Provider>
          <SnackbarProvider>
            <App />
          </SnackbarProvider>
        </NiceModal.Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
