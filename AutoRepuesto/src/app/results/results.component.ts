import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';  // Importar el servicio del carrito

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  @Input() results: any[] = [];  // Recibe los resultados desde el componente principal (SearchComponent)

  constructor(private cartService: CartService) {}

  // Método para agregar al carrito
  onAddToCart(product: any) {
    this.cartService.addToCart(product);  // Usar el servicio para agregar al carrito
    alert(`${product.nombre} ha sido agregado al carrito`);
  }
}
