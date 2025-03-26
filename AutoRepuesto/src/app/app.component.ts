import { Component } from '@angular/core';
import { SearchComponent } from './search/search.component';
import { CartComponent } from './cart/cart.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { CommonModule } from '@angular/common'; // Asegúrate de tener CommonModule
import { HttpClientModule } from '@angular/common/http';  // Importar HttpClientModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,  // Asegúrate de importar CommonModule
    HttpClientModule,  // Esto habilita el uso de HttpClient y sus pipes como 'currency'
    SearchComponent,
    CartComponent,
    OrderSummaryComponent,
  ],
  template: `
    <app-search></app-search>
    <app-cart></app-cart>
    <app-order-summary></app-order-summary>
  `,
})
export class AppComponent {}
