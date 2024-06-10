import { DateTime } from 'luxon';

export const ROUTES = {
  'super-admin': ['dashboard','filieres', 'articles', 'demands', 'events', 'users', 'roles'],
  admin: ['dashboard','filieres', 'articles', 'demands', 'events', 'users', 'roles'],
  other: ['dashboard','filieres', ],
};

export const PAGE_LIMIT = 10;

export const RULES = {
  email: {
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: 'Invalid email address',
    },
  },
  phone: {
    pattern: {
      value: /^(\+212\s?0?|0)(5|6|7)\d{8}$/,
      message: 'Invalid phone number format. \n Ex: +212 0637814207 or 0637814207',
    },
  },
  password: {
    pattern: {
      value: /^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$/,
      message:
        'Password must contain at least 8 characters, one letter (either uppercase or lowercase), and one number',
    },
  },
  passwordConfirmation: {
    validate: (value, getValue) => value === getValue('password') || 'Passwords do not match',
  },
  endDate: {
    validate: (val, getValue) => {
      return DateTime.fromISO(val) > DateTime.fromISO(getValue('startDate')) || 'End date must be after start date';
    },
  },
};
