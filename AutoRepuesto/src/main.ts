import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';  // Asegúrate de importar `importProvidersFrom`
import { AppModule } from './app/app.module';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(AppModule)  // Proporciona los servicios y módulos necesarios
  ]
}).catch((err) => console.error(err));
