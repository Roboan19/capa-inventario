import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // Usamos RouterModule para enrutamiento
import { RouterOutlet } from '@angular/router'; // Usamos RouterOutlet para mostrar las vistas
import { CommonModule } from '@angular/common'; // Importamos CommonModule para ngIf, ngFor, etc.
import { SearchComponent } from './search/search.component';
import { CartComponent } from './cart/cart.component';
import { InvoiceCreateComponent } from './invoice-create/invoice-create.component'; // Importamos el componente de factura

// Definimos las rutas de la aplicación
const appRoutes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'carrito', component: CartComponent },
  { path: 'factura', component: InvoiceCreateComponent },  // Ruta para la pantalla de factura
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,  // Necesario para directivas comunes como ngIf, ngFor
    RouterModule,  // Necesario para configurar el enrutamiento
    RouterOutlet,  // Necesario para mostrar las vistas del enrutamiento
    SearchComponent,  // Importa el componente de búsqueda
    CartComponent,    // Importa el componente de carrito
    InvoiceCreateComponent,  // Importa el componente de factura
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  currentView: 'search' | 'cart' = 'search';
}
