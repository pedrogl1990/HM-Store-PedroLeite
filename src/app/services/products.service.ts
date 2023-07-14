import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getProductsByCategory(category: string): Observable<Product[]> {
    const url = `${this.baseUrl}/produtos/`;
    return this.http.get<Product[]>(url).pipe(
      map((products) => {
        return products.filter(
          (product) =>
            product.categoria.toLocaleLowerCase() ===
            category.toLocaleLowerCase()
        );
      })
    );
  }
}
