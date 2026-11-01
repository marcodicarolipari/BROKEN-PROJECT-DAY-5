import { Observable } from 'rxjs';
import { AccountSummary } from '../models/account.model';

/**
 * Contratto astratto per il repository degli account.
 * Le implementazioni concrete (es. HttpAccountRepository) devono essere
 * fornite esplicitamente tramite il DI — questa classe NON ha providedIn.
 */
export abstract class AccountRepository {
  abstract getSummary(): Observable<AccountSummary>;
}
