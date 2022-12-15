import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import App from './components/App';
import store from './slices/index';
import './assets/application.css';
import './i18next';

const rollbarConfig = {
  accessToken: 'fffd951913dc488e91be771f5fe1844e',
  environment: 'production',
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
        <ToastContainer />
      </Provider>
    </ErrorBoundary>
  </RollbarProvider>,
);
