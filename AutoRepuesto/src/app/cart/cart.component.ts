import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { CartItem } from '../services/cart-item.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  subtotal: number = 0;
  tax: number = 0;
  total: number = 0;
  private cartSubscription: Subscription | undefined;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartSubscription = this.cartService.getCartItems().subscribe((items: CartItem[]) => {
      this.cartItems = items;
      this.updateTotals();  // Actualizar los totales cada vez que se actualicen los elementos
    });
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  clearCart() {
    this.cartService.clearCart();
  }

  removeFromCart(item: CartItem) {
    this.cartService.removeFromCart(item);
  }

  increaseQuantity(item: CartItem) {
    this.cartService.increaseQuantity(item);
    this.updateTotals();  // Recalcular los totales después de aumentar la cantidad
  }

  decreaseQuantity(item: CartItem) {
    this.cartService.decreaseQuantity(item);
    this.updateTotals();  // Recalcular los totales después de disminuir la cantidad
  }

  // Método para actualizar los totales
  updateTotals() {
    this.subtotal = this.cartService.getSubtotal();
    this.tax = this.cartService.getTax();
    this.total = this.cartService.getTotal();
  }
}
