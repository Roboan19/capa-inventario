import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { Invoice } from '../models/invoice.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoice-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  invoices: Invoice[] = [];

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.invoices = this.invoiceService.getAllInvoices();
  }
}
