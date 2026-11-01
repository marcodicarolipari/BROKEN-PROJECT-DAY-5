import { Routes } from '@angular/router';

import { AccountRepository } from './core/repositories/account.repository';
import { HttpAccountRepository } from './core/repositories/http-account.repository';
import { AccountService } from './core/services/account.service';
import { NOTIFICATION_SERVICE } from './core/notifications/notification.service';
import { ConsoleNotificationService } from './core/notifications/console-notification.service';
import { ToastNotificationService } from './core/notifications/toast-notification.service';
import { ACCOUNT_API_CONFIG, BUSINESS_API_CONFIG } from './core/config/account-api.config';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'private',
    pathMatch: 'full',
  },

  // ──────────────────────────────────────────────────────────────────
  // ROUTE: /private
  // ──────────────────────────────────────────────────────────────────
  {
    path: 'private',
    loadComponent: () =>
      import('./features/private/private-dashboard.component').then(
        (m) => m.PrivateDashboardComponent
      ),
    providers: [
      { provide: AccountRepository, useClass: HttpAccountRepository },
      { provide: NOTIFICATION_SERVICE, useClass: ToastNotificationService },
    ],
  },

  // ──────────────────────────────────────────────────────────────────
  // ROUTE: /business
  // ──────────────────────────────────────────────────────────────────
  {
    path: 'business',
    loadComponent: () =>
      import('./features/business/business-dashboard.component').then(
        (m) => m.BusinessDashboardComponent
      ),
    providers: [
      AccountService,
      { provide: ACCOUNT_API_CONFIG, useValue: BUSINESS_API_CONFIG },
      { provide: AccountRepository, useClass: HttpAccountRepository },
      { provide: NOTIFICATION_SERVICE, useClass: ConsoleNotificationService },
    ],
  },

  {
    path: '**',
    redirectTo: 'private',
  },
];
