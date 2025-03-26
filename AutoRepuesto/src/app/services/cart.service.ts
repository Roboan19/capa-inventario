import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from './cart-item.model'; // Asegúrate de importar la interfaz

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>(this.getCart()); // Inicializamos con los elementos del carrito
  private cart: CartItem[] = [];  // Almacena los productos en el carrito

  constructor() {}

  // Verificar si estamos en un entorno de navegador
  private isBrowser() {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  // Agregar un producto al carrito
  addToCart(product: CartItem) {
    if (this.isBrowser()) {
      const currentCart = this.getCart();  // Obtén el carrito actual
      currentCart.push(product);  // Agrega el nuevo producto
      localStorage.setItem('cart', JSON.stringify(currentCart));  // Guarda el carrito actualizado en localStorage
      this.cartSubject.next(currentCart);  // Emite el nuevo carrito a los suscriptores
      console.log('Producto agregado al carrito:', product);  // Verificar en consola
    }
  }

  // Obtener los productos del carrito como un Observable
  getCartItems() {
    return this.cartSubject.asObservable();  // Devolvemos un Observable del carrito
  }

  // Método para obtener los productos del carrito desde localStorage
  getCart() {
    if (this.isBrowser()) {  // Solo acceder a localStorage si estamos en el navegador
      const cart = localStorage.getItem('cart');
      return cart ? JSON.parse(cart) : [];  // Devuelve el carrito o un arreglo vacío si no hay nada
    }
    return [];  // Retorna un arreglo vacío si no estamos en un entorno de navegador
  }

  // Vaciar el carrito
  clearCart() {
    if (this.isBrowser()) {  // Solo acceder a localStorage si estamos en el navegador
      this.cart = [];
      localStorage.removeItem('cart');
      this.cartSubject.next(this.cart);  // Emitir carrito vacío a los suscriptores
    }
  }
}
