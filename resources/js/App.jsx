import './bootstrap';
import '@/styles/index.css';

import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { AppLayout } from '@/layouts/AppLayout';
import { ThemeProvider } from './context/ThemeContext';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorScreen } from './components/ui/ErrorScreen';
import { I18nextProvider } from 'react-i18next';
import { ConfirmationModalProvider } from './context/ConfirmationModal';
import { i18n } from './i18n/config';

createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
    const page = pages[`./Pages/${name}.jsx`];

    console.log(name)

    page.default.layout =
      page.default.layout ||
      ((page) => (
        <AppLayout>
          {name.includes('/Show') ? (
            <div className='flex h-full flex-col gap-5 overflow-auto rounded-lg border border-border p-5 pb-3'>
              {page}
            </div>
          ) : (
            page
          )}
        </AppLayout>
      ));

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
            <ConfirmationModalProvider>
              <App {...props} />
            </ConfirmationModalProvider>
          </I18nextProvider>
        </ErrorBoundary>
      </ThemeProvider>
    );
  },
  progress: {
    delay: 250,
    color: '#29d',
    includeCSS: true,
  },
});
