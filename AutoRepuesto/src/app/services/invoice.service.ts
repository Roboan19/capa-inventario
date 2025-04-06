import { Injectable } from '@angular/core';
import { Invoice } from '../models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private invoices: Invoice[] = [];

  constructor() {}

  // Obtener todas las facturas
  getAllInvoices(): Invoice[] {
    return this.invoices;
  }

  // Crear una nueva factura
  createInvoice(invoice: Invoice): void {
    this.invoices.push(invoice);
  }
}
