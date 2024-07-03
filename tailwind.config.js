/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.jsx',
  ],

  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        'secondary-hover': 'var(--secondary-hover)',
        'primary-hover': 'var(--primary-hover)',
        'background-primary': 'var(--background-primary)',
        'background-secondary': 'var(--background-secondary)',
        'background-tertiary': 'var(--background-tertiary)',
        'background-disabled': 'var(--background-disabled)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary': 'var(--text-tertiary)',
        'text-disabled': 'var(--text-disabled)',
        'text-placeholder': 'var(--text-placeholder)',
        border: 'var(--border)',
      },
      screens: {
        xs: '400px',
        mobile: '540px',
      },
      animation: {
        'wiggle-1s': 'filiereImg 3.5s infinite',
        'wiggle-1s-delay-1s': 'filiereImg 3.5s infinite 1s', // 2s delay
        'wiggle-1s-delay-2s': 'filiereImg 4s infinite 2s', // 4s delay
      },
      keyframes: {
        filiereImg: {
          '0%': {
            transform: 'translate(0px,-10px)',
          },
          '25%': {
            transform: 'translate(10px,0px) scale(1)',
          },
          '50%': {
            transform: 'translate(0px,10px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px,-10px)',
          },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.child-padding': {
          '> *': {
            paddingInline: '1.25rem',
          },
          '@media (min-width: 640px)': {
            '> *': {
              paddingInline: '2rem',
            },
          },
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
