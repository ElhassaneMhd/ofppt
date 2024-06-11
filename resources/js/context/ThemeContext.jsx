import { createContext, useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { Toaster } from 'sonner';

const getTheme = () => {
  const theme = window.localStorage.getItem('theme');
  return ['undefined', 'null'].includes(theme) || !theme ? 'dark' : theme;
};

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getTheme);

  const changeTheme = (newTheme, firstTime) => {
    if (theme === newTheme && !firstTime) return;

    setTheme(newTheme);
    window.localStorage.setItem('theme', newTheme);
    document.documentElement.className = `${newTheme} theme-transition`;
    setTimeout(() => document.documentElement.classList.remove('theme-transition'), 400);
  };

  useEffect(() => {
    changeTheme(getTheme(), true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
      <Toaster
        icons={{
          loading: <FaSpinner className='animate-spin text-lg text-text-secondary' />,
        }}
        position={window.innerWidth < 768 ? 'bottom-center' : 'bottom-right'}
        theme={theme}
        toastOptions={{
          className: 'sonner-toast',
          duration: 2000,
        }}
      />
    </ThemeContext.Provider>
  );
}
