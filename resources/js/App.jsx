import './bootstrap';
import '@/styles/index.css';

import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './context/ThemeContext';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorScreen } from './components/ui/ErrorScreen';
import { I18nextProvider } from 'react-i18next';
import { ConfirmationModalProvider } from './context/ConfirmationModal';
import { i18n } from './i18n/config';
import NotFound from './Pages/NotFound';
import Settings from './Pages/Admin/Settings/Settings';
import { AppLayout } from './layouts/Admin/AppLayout';

createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
    const page = pages[`./Pages/${name}.jsx`];

    const pageLayout = name?.startsWith('Admin')
      ? // Admin page layout
        (page) => {
          const layout = name.includes('/Show') ? (
            <div className='flex flex-1 border border-border rounded-xl p-5 flex-col gap-5 overflow-auto'>{page}</div>
          ) : name.includes('/Settings/') ? (
            <Settings>{page}</Settings>
          ) : (
            page
          );
          // console.log(layout)
          return <AppLayout>{layout}</AppLayout>;
        }
      : undefined;

    // console.log(name, page);

    if (!page) return NotFound;

    page.default.layout = page.default.layout || pageLayout;

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
