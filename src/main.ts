import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

registerLocaleData(localeIt, 'it');

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    // NOTA: AccountRepository NON è fornito qui (root).
    // Deve essere fornito a livello di route. Vedi app.routes.ts.
  ],
}).catch((err) => console.error(err));
