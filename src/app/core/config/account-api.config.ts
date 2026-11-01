import { InjectionToken } from '@angular/core';

export interface AccountApiConfig {
  baseUrl: string;
  area: 'private' | 'business';
}

/**
 * Token di configurazione per l'API degli account.
 * Il factory di default fornisce la configurazione PRIVATE.
 * Le route possono sovrascrivere questo token con una configurazione specifica.
 */
export const ACCOUNT_API_CONFIG = new InjectionToken<AccountApiConfig>(
  'ACCOUNT_API_CONFIG',
  {
    providedIn: 'root',
    factory: () => ({
      baseUrl: '/api/private',
      area: 'private',
    }),
  }
);

export const BUSINESS_API_CONFIG: AccountApiConfig = {
  baseUrl: '/api/business',
  area: 'business',
};
