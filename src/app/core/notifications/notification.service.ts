import { InjectionToken } from '@angular/core';

export type NotificationLevel = 'info' | 'error';

export abstract class NotificationService {
  abstract notify(message: string, level: NotificationLevel): void;
}

// Nessun factory: fuori dalle aree configurate l'iniezione fallisce con NullInjectorError.
export const NOTIFICATION_SERVICE = new InjectionToken<NotificationService>(
  'NOTIFICATION_SERVICE'
);
