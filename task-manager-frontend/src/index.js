import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
    domain="dev-30b3vuzr0bwb1ipl.us.auth0.com"
    clientId="j3ihQLLWCyKmhnoKqUXX8lfXDRhffgYW"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "https://taskmanager.api",
      scope: "email openid profile view:tasks create:tasks edit:tasks delete:tasks"
    }}
  >
    <App />
  </Auth0Provider>
);