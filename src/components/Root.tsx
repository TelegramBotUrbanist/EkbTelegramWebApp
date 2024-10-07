import { SDKProvider, useLaunchParams } from '@telegram-apps/sdk-react';
import { type FC, useEffect, useMemo } from 'react';
import App from '../App.tsx';
import { ErrorBoundary } from './ErrorBoundary';
import { SnackbarProvider } from 'notistack';

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
  const manifestUrl = useMemo(() => {
    return new URL('tonconnect-manifest.json', window.location.href).toString();
  }, []);

  return (
    <SDKProvider acceptCustomStyles debug={debug}>
      <SnackbarProvider>
      <App />
      </SnackbarProvider>
    </SDKProvider>
  );
};

export const Root: FC = () => (
  <ErrorBoundary fallback={ErrorBoundaryError}>
    <Inner />
  </ErrorBoundary>
);
