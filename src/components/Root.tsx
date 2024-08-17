import { SDKProvider, useLaunchParams } from '@telegram-apps/sdk-react';
import { type FC, useEffect, useMemo } from 'react';
import App from '../App.tsx';
import { ErrorBoundary } from './ErrorBoundary';
import { SnackbarProvider } from 'notistack';
import { initNavigator } from '@telegram-apps/sdk';
import { useIntegration } from '@telegram-apps/react-router-integration';
import { Router } from 'react-router-dom';

const ErrorBoundaryError: FC<{ error: unknown }> = ({ error }) => (
  <div>
    <p>An unhandled error occurred:</p>
    <blockquote>
      <code>
        {error instanceof Error
          ? error.message
          : typeof error === 'string'
            ? error
            : JSON.stringify(error)}
      </code>
    </blockquote>
  </div>
);

const Inner: FC = () => {
  const debug = useLaunchParams().startParam === 'debug';
  const navigator = useMemo(() => initNavigator('app-navigation-state'), []);
  const [location, reactNavigator] = useIntegration(navigator)
  const manifestUrl = useMemo(() => {
    return new URL('tonconnect-manifest.json', window.location.href).toString();
  }, []);

  useEffect(() => {
    navigator.attach();
    return () => navigator.detach();
  }, [navigator]);

  return (
    <SDKProvider acceptCustomStyles debug={debug}>
      <SnackbarProvider>
        <Router  location={location} navigator={reactNavigator}>
      <App />
        </Router>

      </SnackbarProvider>
    </SDKProvider>
  );
};

export const Root: FC = () => (
  <ErrorBoundary fallback={ErrorBoundaryError}>
    <Inner />
  </ErrorBoundary>
);
