import { Component } from '@angular/core';
import { SearchComponent } from './search/search.component';
import { CartComponent } from './cart/cart.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    SearchComponent,
    CartComponent,
  ],
  template: `
    <div style="margin-bottom: 1rem;">
      <button (click)="currentView = 'search'">Buscar Productos</button>
      <button (click)="currentView = 'cart'">Ver Carrito</button>
    </div>

    <app-search *ngIf="currentView === 'search'"></app-search>
    <app-cart *ngIf="currentView === 'cart'"></app-cart>
  `
})
export class AppComponent {
  currentView: 'search' | 'cart' = 'search';
}
