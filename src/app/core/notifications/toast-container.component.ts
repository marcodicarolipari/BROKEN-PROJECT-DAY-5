import { Component, inject } from '@angular/core';

import { NOTIFICATION_SERVICE } from './notification.service';
import { ToastNotificationService } from './toast-notification.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  styles: [
    `
      .toast-container {
        position: fixed;
        bottom: 1.5rem;
        left: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        z-index: 1000;
      }
      .toast {
        min-width: 320px;
        padding: 1.25rem 1.75rem;
        font-size: 1.25rem;
        font-weight: 600;
        border-radius: 10px;
        color: #fff;
        background: #2b6cb0;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
      }
      .toast.error {
        background: #c53030;
      }
    `,
  ],
  template: `
    <div class="toast-container">
      @for (t of service.toasts(); track t.id) {
        <div class="toast" [class.error]="t.level === 'error'">{{ t.message }}</div>
      }
    </div>
  `,
})
export class ToastContainerComponent {
  protected readonly service = inject(NOTIFICATION_SERVICE) as ToastNotificationService;
}
