import { Injectable } from '@angular/core';

import { NotificationLevel, NotificationService } from './notification.service';

@Injectable()
export class ConsoleNotificationService extends NotificationService {
  notify(message: string, level: NotificationLevel): void {
    const log = level === 'error' ? console.error : console.log;
    log(`[CONSOLE] [${level}] ${message}`);
  }
}
