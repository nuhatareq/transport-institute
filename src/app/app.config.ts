// import {
//   ApplicationConfig,
//   provideZoneChangeDetection,
//   importProvidersFrom 
// } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { HttpClientModule } from '@angular/common/http'; 
// import { routes } from './app.routes';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideZoneChangeDetection({ eventCoalescing: true }),
//     provideRouter(routes),
//     importProvidersFrom(HttpClientModule) 
//   ],
// };


import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
  LOCALE_ID
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/ar';
registerLocaleData(localeAr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    { provide: LOCALE_ID, useValue: 'ar-EG' } 
  ]
};
