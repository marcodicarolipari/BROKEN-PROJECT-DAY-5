import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CurrencyPipe } from '@angular/common';

import { AccountService } from '../../core/services/account.service';
import { AccountApiConfig } from '../../core/config/account-api.config';

/**
 * Dashboard per l'area BUSINESS.
 */
@Component({
  selector: 'app-business-dashboard',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <div class="dashboard">
      <div class="dashboard-header">
        <h2>Dashboard Business</h2>
        <p>Riepilogo conti aziendali</p>
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
          Caricamento conti business...
        </div>
      }

      <div class="debug-banner">
        <strong>DEBUG</strong>
        Config attiva: baseUrl = <code>{{ activeConfig.baseUrl }}</code> | area = <code>{{ activeConfig.area }}</code>.
      </div>
    </div>
  `,
})
export class BusinessDashboardComponent {
  private readonly service = inject(AccountService);

  readonly summary = toSignal(this.service.getSummary());

  get activeConfig(): AccountApiConfig {
    return this.service.config;
  }

  constructor() {
    console.log(
      `%c[BusinessDashboard] AccountService.config.area = "${this.service.config.area}"`,
      'color: #276749; font-weight: bold;'
    );
  }
}
