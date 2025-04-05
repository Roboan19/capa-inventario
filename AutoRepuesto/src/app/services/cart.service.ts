import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from './cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>(this.getCart());
  private cart: CartItem[] = [];

  constructor() {}

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  addToCart(product: CartItem): void {
    if (this.isBrowser()) {
      const currentCart = this.getCart();  
      const existingItem = currentCart.find((item: CartItem) => item.codigo === product.codigo);

      if (existingItem) {
        existingItem.cantidad++;
      } else {
        product.cantidad = 1;
        currentCart.push(product);
      }

      localStorage.setItem('cart', JSON.stringify(currentCart));  
      this.cartSubject.next(currentCart);  
    }
  }

  getCartItems() {
    return this.cartSubject.asObservable();
  }

  getCart(): CartItem[] {
    if (this.isBrowser()) {
      const cart = localStorage.getItem('cart');
      return cart ? JSON.parse(cart) : [];
    }
    return [];
  }

  // Método para calcular el sub-total
  getSubtotal(): number {
    const currentCart = this.getCart();
    return currentCart.reduce((total: number, item: CartItem): number => total + (item.precio * item.cantidad), 0);
  }

  // Método para calcular el impuesto (7%)
  getTax(): number {
    const subtotal: number = this.getSubtotal();
    return subtotal * 0.07;  // 7% de impuesto
  }

  // Método para calcular el total (sub-total + impuesto)
  getTotal(): number {
    return this.getSubtotal() + this.getTax();
  }

  clearCart(): void {
    if (this.isBrowser()) {
      this.cart = [];
      localStorage.removeItem('cart');
      this.cartSubject.next(this.cart);
    }
  }

  removeFromCart(item: CartItem): void {
    if (this.isBrowser()) {
      const currentCart = this.getCart();
      const updatedCart = currentCart.filter((cartItem: CartItem) => cartItem.codigo !== item.codigo);

      localStorage.setItem('cart', JSON.stringify(updatedCart));  
      this.cartSubject.next(updatedCart);
    }
  }

  increaseQuantity(item: CartItem): void {
    if (this.isBrowser()) {
      const currentCart = this.getCart();
      const existingItem = currentCart.find((cartItem: CartItem) => cartItem.codigo === item.codigo);

      if (existingItem) {
        existingItem.cantidad++;
      }

      localStorage.setItem('cart', JSON.stringify(currentCart));  
      this.cartSubject.next(currentCart);  
    }
  }

  decreaseQuantity(item: CartItem): void {
    if (this.isBrowser()) {
      const currentCart = this.getCart();
      const existingItem = currentCart.find((cartItem: CartItem) => cartItem.codigo === item.codigo);

      if (existingItem && existingItem.cantidad > 1) {
        existingItem.cantidad--;
      }

      localStorage.setItem('cart', JSON.stringify(currentCart));  
      this.cartSubject.next(currentCart);  
    }
  }
}
