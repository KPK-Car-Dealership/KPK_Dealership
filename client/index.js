import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const auth0Domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

createRoot(document.getElementById('app')).render(
<React.StrictMode>
    <Auth0Provider
        auth0Domain={auth0Domain}
        clientId={clientId}
        authorizationParams={{
            redirect_uri: window.location.origin
          }}
    >
        <App />
    </Auth0Provider>
</React.StrictMode>
);