import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';  // Asegúrate de importar el servicio
import { CartItem } from '../services/cart-item.model';  // Asegúrate de importar la interfaz
import { Subscription } from 'rxjs';  // Importa Subscription para manejar la suscripción

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];  // Cambiar el tipo de 'any' a 'CartItem[]'
  total: number = 0;
  private cartSubscription: Subscription | undefined;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // Nos suscribimos al Observable que emite el carrito actualizado
    this.cartSubscription = this.cartService.getCartItems().subscribe((items: CartItem[]) => {
      this.cartItems = items;  // Actualizamos el carrito en el componente
      this.calculateTotal();
    });
  }

  ngOnDestroy() {
    // Nos desuscribimos cuando el componente se destruya
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((sum, item) => sum + item.precio, 0);
  }

  // Método para vaciar el carrito
  clearCart() {
    this.cartService.clearCart();
  }
}
