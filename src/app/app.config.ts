import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideNgxMask } from 'ngx-mask';
import { authInterceptor } from './interceptors/authInterceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
  provideAnimationsAsync(),
  providePrimeNG({
    theme: {
      preset: Aura
    }
  }),
  provideHttpClient(withInterceptors([authInterceptor])),
  provideHttpClient(),
  provideAnimations(),
  provideToastr(),
  provideNgxMask(),
  provideAnimations()]
};
