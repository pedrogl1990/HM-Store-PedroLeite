import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private wishlist: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(
    []
  );

  constructor(private http: HttpClient) {
    this.getWishlistFromDatabase();
  }

  getWishlistFromDatabase(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3000/produtos').pipe(
      map((produtos: Product[]) => {
        const updatedWishlist = produtos.map((produto) => {
          const favorito = produto.favorito ?? false;
          return { ...produto, favorito };
        });
        this.wishlist.next(updatedWishlist);
        return updatedWishlist;
      })
    );
  }

  addToWishlist(product: Product): void {
    product.favorito = true;
    const currentWishlist = this.wishlist.getValue();
    const updatedWishlist = [...currentWishlist, product];
    this.wishlist.next(updatedWishlist);
  }

  removeFromWishlist(productId: number): Observable<void> {
    const url = `http://localhost:3000/produtos/${productId}`;
    return this.http.patch<void>(url, { favorito: false });
  }
}
