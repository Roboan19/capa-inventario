import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';  // Asegúrate de importar el servicio
import { CartItem } from '../services/cart-item.model';  // Asegúrate de importar la interfaz
import { Subscription } from 'rxjs';  // Importa Subscription para manejar la suscripción

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];  // Cambiar el tipo de 'any' a 'CartItem[]'
  private cartSubscription: Subscription | undefined;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // Nos suscribimos al Observable que emite el carrito actualizado
    this.cartSubscription = this.cartService.getCartItems().subscribe((items: CartItem[]) => {
      this.cartItems = items;  // Actualizamos el carrito en el componente
    });
  }

  ngOnDestroy() {
    // Nos desuscribimos cuando el componente se destruya
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  // Método para vaciar el carrito
  clearCart() {
    this.cartService.clearCart();
  }
}
