import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideNgToast } from 'ng-angular-popup';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withViewTransitions()),
    provideZonelessChangeDetection(),
    provideNgToast({
      duration: 5000,
      position: 'toaster-top-right',
      maxToasts: 3,
      width: 400,
      showProgress: true,
      dismissible: true,
      showIcon: true,
      enableAnimations: true,
    }),
  ],
};
