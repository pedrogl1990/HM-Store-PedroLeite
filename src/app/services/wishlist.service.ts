import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  wishlist: Product[] = [];

  constructor() {}

  addToWishlist(product: Product) {
    product.favorito = true;
    this.wishlist.push(product);
  }

  removeFromWishlist(productId: number) {
    const index = this.wishlist.findIndex((item) => item.id === productId);
    if (index !== -1) {
      this.wishlist.splice(index, 1);
    }
  }

  isProductInWishlist(productId: number): boolean {
    return this.wishlist.some((item) => item.id === productId);
  }
}
