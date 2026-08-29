// Polyfill process for browser environments
if (typeof window !== 'undefined') {
  (window as any).process = (window as any).process || { env: { NODE_ENV: 'production' } };
  (window as any).global = (window as any).global || window;
}

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import './index.css';

// Unregister any broken or stale legacy service workers
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      registration.update().catch(() => {});
    }
  }).catch(() => {});
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>,
  );
}
