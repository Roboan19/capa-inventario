import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

// Importa tus componentes
import { SearchComponent } from './search/search.component';
import { CartComponent } from './cart/cart.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
    provideRouter([
      { path: '', component: SearchComponent },        // Página principal
      { path: 'carrito', component: CartComponent }    // Página del carrito
    ])
  ]
};
