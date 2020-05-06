import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const ErrorFallback = ({ error, componentStack, resetErrorBoundary }) => (
    <div role="alert">
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <pre>{componentStack}</pre>
        <button type="button" onClick={resetErrorBoundary}>
            Try again
        </button>
    </div>
);
export default ({ children }) => (
    <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
            // reset the state of your app so the error doesn't happen again
        }}>
        {children}
    </ErrorBoundary>
);
