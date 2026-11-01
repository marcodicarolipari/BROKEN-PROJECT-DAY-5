import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CurrencyPipe } from '@angular/common';

import { AccountService } from '../../core/services/account.service';
import { ToastContainerComponent } from '../../core/notifications/toast-container.component';

/**
 * Dashboard per l'area PRIVATE.
 */
@Component({
  selector: 'app-private-dashboard',
  standalone: true,
  imports: [CurrencyPipe, ToastContainerComponent],
  providers: [AccountService],
  template: `
    <app-toast-container />
    <div class="dashboard">
      <div class="dashboard-header">
        <h2>Dashboard Privata</h2>
        <p>Riepilogo conti personali</p>
      </div>

      @if (summary()) {
        <div class="summary-card">
          <div class="summary-card-header">
            <h3>{{ summary()!.owner }}</h3>
            <span class="area-badge" [class]="summary()!.area">
              {{ summary()!.area }}
            </span>
          </div>
          <div class="summary-card-body">
            <div class="balance-total">
              {{ summary()!.balance | currency:'EUR':'symbol':'1.2-2':'it' }}
            </div>
            <div class="accounts-list">
              @for (acc of summary()!.accounts; track acc.iban) {
                <div class="account-item">
                  <div>
                    <div class="account-label">{{ acc.label }}</div>
                    <div class="account-iban">{{ acc.iban }}</div>
                  </div>
                  <div class="account-balance">
                    {{ acc.balance | currency:'EUR':'symbol':'1.2-2':'it' }}
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      } @else {
        <div class="loading">
          <div class="spinner"></div>
          Caricamento conti privati...
        </div>
      }

      <div class="debug-banner">
        <strong>DEBUG</strong>
        Apri DevTools → Console per vedere i log di AccountService.
      </div>
    </div>
  `,
})
export class PrivateDashboardComponent {
  private readonly service = inject(AccountService);

  readonly summary = toSignal(this.service.getSummary());
}
