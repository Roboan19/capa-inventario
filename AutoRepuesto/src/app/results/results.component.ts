import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Importa FormsModule
import { CartService } from '../services/cart.service';  // Importar el servicio del carrito

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Agregar FormsModule aquí
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  @Input() results: any[] = [];  // Recibe los resultados desde el componente principal (SearchComponent)

  constructor(private cartService: CartService) {}

  // Método para agregar al carrito
  onAddToCart(product: any) {
    // Si la cantidad no es válida, usamos 1 como valor por defecto
    const cantidad = product.cantidad > 0 ? product.cantidad : 1;
    product.cantidad = cantidad; // Asignar la cantidad seleccionada al producto
    this.cartService.addToCart(product);  // Usar el servicio para agregar al carrito
    alert(`${product.nombre} ha sido agregado al carrito con ${cantidad} unidades.`);
  }
}
