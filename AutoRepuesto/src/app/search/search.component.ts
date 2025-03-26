import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ResultsComponent } from '../results/results.component';
import { CartService } from '../services/cart.service';  // Importar el CartService

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, ResultsComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  codigo: string = '';
  nombre: string = '';
  descripcion: string = '';
  marca: string = '';
  modelo: string = '';
  motor: string = '';

  results: any[] = [];

  constructor(private http: HttpClient, private cartService: CartService) {}

  search() {
    const params: any = {};
    if (this.codigo) params.codigo = this.codigo;
    if (this.nombre) params.nombre = this.nombre;
    if (this.descripcion) params.descripcion = this.descripcion;
    if (this.marca) params.marca = this.marca;
    if (this.modelo) params.modelo = this.modelo;
    if (this.motor) params.motor = this.motor;

    this.http.post<any[]>('http://localhost:5163/api/piezas/consultar', params).subscribe({
      next: (data) => {
        this.results = data;
      },
      error: (err) => console.error('Error en la búsqueda:', err),
    });

    // Limpiar los inputs después de la búsqueda
    this.codigo = '';
    this.nombre = '';
    this.descripcion = '';
    this.marca = '';
    this.modelo = '';
    this.motor = '';
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);  // Usar el servicio para agregar el producto
    console.log('Producto agregado:', product);  // Verificar que el producto se agrega correctamente
  }
}
