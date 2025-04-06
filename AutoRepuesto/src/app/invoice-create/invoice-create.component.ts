import { Component } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';  // Necesario para directivas comunes

@Component({
  selector: 'app-invoice-create',
  standalone: true,  // Hacemos este componente standalone
  imports: [FormsModule, CommonModule],  // Importamos FormsModule para ngModel y CommonModule
  templateUrl: './invoice-create.component.html',
  styleUrls: ['./invoice-create.component.css'],
})
export class InvoiceCreateComponent {
  cliente: string = '';
  descripcion: string = '';   // Agregado para el campo descripcion
  cantidad: number = 1;       // Agregado para el campo cantidad (con valor inicial)
  precio: number = 0;         // Agregado para el campo precio (con valor inicial)
  items: { descripcion: string; cantidad: number; precio: number }[] = [];
  total: number = 0;

  constructor(private invoiceService: InvoiceService) {}

  // Método para agregar un item a la factura
  addItem() {
    if (this.descripcion && this.cantidad && this.precio) {
      this.items.push({ descripcion: this.descripcion, cantidad: this.cantidad, precio: this.precio });
      this.updateTotal();
      this.clearItemFields();
    }
  }

  // Método para actualizar el total de la factura
  updateTotal() {
    this.total = this.items.reduce((sum, item) => sum + item.cantidad * item.precio, 0);
  }

  // Método para crear la factura
  createInvoice() {
    const invoice = {
      id: Date.now(),  // Genera un ID único usando la fecha
      cliente: this.cliente,
      total: this.total,
      fecha: new Date().toISOString(),
      items: this.items
    };

    this.invoiceService.createInvoice(invoice);
    this.clearForm();
  }

  // Limpiar el formulario después de crear la factura
  clearForm() {
    this.cliente = '';
    this.items = [];
    this.total = 0;
  }

  // Limpiar los campos del ítem después de agregarlo
  clearItemFields() {
    this.descripcion = '';
    this.cantidad = 1;
    this.precio = 0;
  }
}
