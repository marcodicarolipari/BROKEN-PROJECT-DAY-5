# lipari-accounts-di-broken

Progetto Angular 19 standalone con **3 bug di Dependency Injection** da trovare e correggere.

## Avvio

```bash
npm install
ng serve
# oppure
ng serve --open
```

---

## Architettura

```
src/app/
├── core/
│   ├── config/account-api.config.ts   ← InjectionToken ACCOUNT_API_CONFIG (factory: private)
│   ├── models/account.model.ts        ← AccountSummary, MOCK_PRIVATE_SUMMARY, MOCK_BUSINESS_SUMMARY
│   ├── repositories/
│   │   ├── account.repository.ts      ← abstract class AccountRepository
│   │   └── http-account.repository.ts ← implementazione concreta (usa of(MOCK).pipe(delay(300)))
│   └── services/account.service.ts    ← providedIn:'root', inietta AccountRepository + ACCOUNT_API_CONFIG
└── features/
    ├── private/private-dashboard.component.ts
    └── business/business-dashboard.component.ts
```

**Flusso DI corretto (senza bug):**

```
Route injector
  └─ AccountService        (re-fornito per isolamento)
       ├─ AccountRepository → HttpAccountRepository  (concrete impl)
       └─ ACCOUNT_API_CONFIG                         (override per area)
```

---

## MISSIONE #1 — NullInjectorError su /private

### Sintomi

- Navigando su `/private` l'app crasha immediatamente.
- In DevTools → Console compare un errore simile a:
  ```
  ERROR NullInjectorError: R3InjectorError(Environment Injector)[AccountService -> AccountRepository]:
    NullInjectorError: No provider for AccountRepository!
  ```
- La schermata rimane vuota o mostra un errore Angular.

---

## MISSIONE #2 — Doppia istanza di AccountService

### Sintomi

- Anche dopo aver risolto la Missione #1, in DevTools → Console vedi il log `[AccountService] istanziato per area: "private"` che appare **due volte** quando navighi su `/private`.
- Angular DevTools → Component tree mostra **AccountService** sia nel nodo `EnvironmentInjector` (root) sia nel nodo `PrivateDashboardComponent`.
- Le due istanze non condividono stato: un eventuale cache/stato interno sarebbe duplicato.

---

## MISSIONE #3 — La dashboard Business usa l'endpoint Privato

### Sintomi

- Navigando su `/business` l'app non crasha, ma la dashboard mostra:
  - **Titolare: Mario Rossi** invece di *Lipari SRL*
  - **Area: private** invece di *business*
  - Il saldo e i conti sono quelli del profilo privato
- Il banner di debug in basso mostra `baseUrl = /api/private` e `area = private`.
- In DevTools → Console il log `[HttpAccountRepository] chiamata simulata a /api/private/summary → area: private` conferma l'endpoint sbagliato.

---

## Note tecniche

- **HttpClient** è configurato con `provideHttpClient()` in `main.ts`.
- Le chiamate HTTP sono **simulate** con `of(MOCK_DATA).pipe(delay(300))` nel repository — il delay rende visibile lo stato di caricamento.
- Il mock restituito dipende da `ACCOUNT_API_CONFIG.area`: se è `'business'` restituisce i dati di Lipari SRL, altrimenti quelli di Mario Rossi.
- `AccountRepository` è una classe astratta: non ha `providedIn` e deve essere fornita esplicitamente tramite `{ provide: AccountRepository, useClass: HttpAccountRepository }`.

---

## Bonus Mission — Feature da Implementare (opzionale, ~1 ora)

Una volta risolti i 3 bug, implementa la seguente feature per consolidare i concetti del giorno.

### Servizio di notifica con token e scope gerarchici

L'applicazione non ha nessun meccanismo per mostrare notifiche o messaggi all'utente (es. "Dati caricati", "Errore di connessione").

**Cosa implementare:**

Crea un sistema di notifiche basato su un `InjectionToken` chiamato `NOTIFICATION_SERVICE` che punta a una classe astratta `NotificationService` con almeno il metodo `notify(message: string, level: 'info' | 'error'): void`.

Fornisci due implementazioni concrete:

- `ConsoleNotificationService`: scrive in console con il prefisso `[CONSOLE]`.
- `ToastNotificationService`: accumula le notifiche in un Signal e le mostra in un banner visibile nell'UI (basta un semplice overlay con le ultime 3 notifiche, che scompaiono dopo 3 secondi).

L'area `/private` deve usare `ToastNotificationService` (configurata nel suo injector di route). L'area `/business` deve usare `ConsoleNotificationService`. Il root injector non deve fornire nessuna implementazione — se un componente la inietta fuori dalle aree configurate, deve ottenere un errore esplicito.

`AccountService` deve chiamare `notify(...)` ogni volta che i dati vengono caricati con successo o quando si verifica un errore.

**Criteri di accettazione:**

- Navigando su `/private`, le notifiche appaiono visivamente nell'UI come toast.
- Navigando su `/business`, le notifiche appaiono solo in console.
- Iniettando `NOTIFICATION_SERVICE` fuori dai due contesti configurati si ottiene un errore Angular a runtime, non silenzio.
- Le implementazioni sono intercambiabili senza modificare `AccountService`.
- Nessun bug risolto in precedenza viene reintrodotto.

---

*LipariBank Prompt Bootcamp — Dependency Injection & Hierarchical Injectors — Day 05*
