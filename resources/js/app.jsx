import './bootstrap';
import '@/styles/index.css';

import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { AppLayout } from '@/layouts/AppLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './context/ThemeContext';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorScreen } from './components/ui/ErrorScreen';
import { I18nextProvider } from 'react-i18next';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfirmationModalProvider } from './context/ConfirmationModal';
import { i18n } from './i18n/config';

const queryClient = new QueryClient();

createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
    const page = pages[`./Pages/${name}.jsx`];
    page.default.layout = page.default.layout || ((page) => <AppLayout>{page}</AppLayout>);
    return page;
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <ThemeProvider>
        <ErrorBoundary
          FallbackComponent={ErrorScreen}
          onError={(error, stack) => {
            console.log(
              '%c%s',
              'color: #ffffff;font-weight : bold; background: #ff0000; padding : 10px 20px; border-radius : 10px',
              `Error : ${error}`
            );
            console.log(stack?.componentStack);
          }}
        >
          <I18nextProvider i18n={i18n}>
            <QueryClientProvider client={queryClient}>
              <ReactQueryDevtools initialIsOpen={false} />
              <ConfirmationModalProvider>
                <App {...props} />
              </ConfirmationModalProvider>
            </QueryClientProvider>
          </I18nextProvider>
        </ErrorBoundary>
      </ThemeProvider>
    );
  },
});
