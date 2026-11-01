import { Injectable, signal } from '@angular/core';

import { NotificationLevel, NotificationService } from './notification.service';

export interface Toast {
  id: number;
  message: string;
  level: NotificationLevel;
}

const MAX_VISIBLE = 3;
const TTL_MS = 3000;

@Injectable()
export class ToastNotificationService extends NotificationService {
  private nextId = 0;
  private readonly _toasts = signal<Toast[]>([]);
  readonly toasts = this._toasts.asReadonly();

  notify(message: string, level: NotificationLevel): void {
    const id = this.nextId++;
    this._toasts.update((list) => [...list, { id, message, level }].slice(-MAX_VISIBLE));
    setTimeout(
      () => this._toasts.update((list) => list.filter((t) => t.id !== id)),
      TTL_MS
    );
  }
}
