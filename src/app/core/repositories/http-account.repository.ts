import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { AccountRepository } from './account.repository';
import { AccountSummary, MOCK_PRIVATE_SUMMARY, MOCK_BUSINESS_SUMMARY } from '../models/account.model';
import { ACCOUNT_API_CONFIG } from '../config/account-api.config';

/**
 * Implementazione concreta di AccountRepository.
 * Usa of(MOCK).pipe(delay(300)) per simulare una chiamata HTTP
 * e rendere visibile il caricamento nella UI.
 *
 * Il mock restituito dipende da ACCOUNT_API_CONFIG.area:
 *   'private'  → MOCK_PRIVATE_SUMMARY  (Mario Rossi)
 *   'business' → MOCK_BUSINESS_SUMMARY (Lipari SRL)
 */
@Injectable()
export class HttpAccountRepository extends AccountRepository {
  private readonly http = inject(HttpClient);
  private readonly config = inject(ACCOUNT_API_CONFIG);

  getSummary(): Observable<AccountSummary> {
    // In un'app reale:
    // return this.http.get<AccountSummary>(`${this.config.baseUrl}/summary`);

    const mock =
      this.config.area === 'business'
        ? MOCK_BUSINESS_SUMMARY
        : MOCK_PRIVATE_SUMMARY;

    console.log(
      `[HttpAccountRepository] chiamata simulata a ${this.config.baseUrl}/summary → area: ${this.config.area}`
    );

    return of(mock).pipe(delay(300));
  }
}
