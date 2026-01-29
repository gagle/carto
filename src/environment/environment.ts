import type { AppEnvironment } from './environment.interface';

export const environment: AppEnvironment = {
  VITE_CARTO_API_TOKEN: import.meta.env.VITE_CARTO_API_TOKEN,
  VITE_CARTO_API_BASE_URL: import.meta.env.VITE_CARTO_API_BASE_URL,
} as const;
