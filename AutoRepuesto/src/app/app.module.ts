import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';  // Importa FormsModule

// Importa los componentes Standalone
import { SearchComponent } from './search/search.component';
import { CartComponent } from './cart/cart.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceCreateComponent } from './invoice-create/invoice-create.component';  // Importa InvoiceCreateComponent

// Define las rutas
const appRoutes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'carrito', component: CartComponent },
  { path: 'invoices', component: InvoiceListComponent },
  { path: 'invoices/create', component: InvoiceCreateComponent }  // Ruta para crear la factura
];

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,  // Agrega FormsModule aquí
    RouterModule.forRoot(appRoutes),  // Configura el enrutamiento en el módulo
    SearchComponent,
    CartComponent,
    InvoiceListComponent,
    InvoiceCreateComponent  // Registrar el componente aquí
  ],
  providers: [],
})
export class AppModule {}
