export const APP_CONFIG = {
  name: 'DevWorks',
  version: '1.0.0',
  description: 'Next.js and Supabase Starter Kit',
};

export const API_ENDPOINTS = {
  AUTH: {
    SIGN_IN: '/auth/sign-in',
    SIGN_UP: '/auth/sign-up',
    SIGN_OUT: '/auth/sign-out',
  },
  USER: {
    PROFILE: '/user/profile',
    SETTINGS: '/user/settings',
  },
};

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  AUTH: {
    SIGN_IN: '/auth/sign-in',
    SIGN_UP: '/auth/sign-up',
    FORGOT_PASSWORD: '/auth/forgot-password',
  },
};

export const ERROR_MESSAGES = {
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid email or password',
    EMAIL_EXISTS: 'Email already exists',
    WEAK_PASSWORD: 'Password is too weak',
  },
  GENERAL: {
    SOMETHING_WRONG: 'Something went wrong. Please try again.',
    NOT_FOUND: 'Resource not found',
  },
}; 