import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { BehaviorSubject, Observable, forkJoin, map } from 'rxjs';
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

  resetAllFavorites(): Observable<void> {
    let resetTasks: Observable<void>[] = [];
    this.wishlist.getValue().forEach((product: Product) => {
      if (product.favorito) {
        const resetTask = this.http.patch<void>(
          `http://localhost:3000/produtos/${product.id}`,
          { favorito: false }
        );
        resetTasks.push(resetTask);
      }
    });

    return forkJoin(resetTasks).pipe(map(() => {}));
  }
}
