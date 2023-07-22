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

  getAllProducts(): Observable<Product[]> {
    const url = `${this.baseUrl}/produtos/`;
    return this.http.get<Product[]>(url);
  }

  getSomeProducts(start: number, amount: number): Observable<Product[]> {
    const url = `${this.baseUrl}/produtos?_start=${start}&_limit=${amount}`;
    return this.http.get<Product[]>(url);
  }

  getHighlightedProducts(): Observable<Product[]> {
    const url = `${this.baseUrl}/produtos?destaque=true`;
    return this.http.get<Product[]>(url);
  }

  removeProduct(productId: number): Observable<void> {
    const url = `${this.baseUrl}/produtos/${productId}`;
    return this.http.delete<void>(url);
  }

  addProduct(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/produtos/`;
    return this.http.post<Product>(url, product);
  }

  updateProduct(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/produtos/${product.id}`;
    return this.http.put<Product>(url, product);
  }

  getTotalProducts(): Observable<number> {
    const url = `${this.baseUrl}/produtos/`;
    return this.http
      .get<Product[]>(url)
      .pipe(map((products) => products.length));
  }
}
