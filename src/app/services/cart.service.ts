import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {
    const storedCartItems = JSON.parse(
      localStorage.getItem('cartItems') || '[]'
    );
    this.cartItems = storedCartItems;
  }

  cartItems: Product[] = [];
  cartItems$ = new Subject<Product[]>();

  addToCart(product: Product) {
    let cartItems: Product[] = this.getCartItems();
    cartItems.push(product);
    this.cartItems = cartItems;
    this.cartItems$.next(this.cartItems);

    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  getCartItems(): Product[] {
    return this.cartItems;
  }

  removeFromCart(productId: string) {
    let cartItems: Product[] = this.getCartItems();
    cartItems = cartItems.filter(
      (product) => product.id.toString() !== productId
    );
    this.cartItems = cartItems;
    this.cartItems$.next(this.cartItems);

    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  isProductInCart(productId: string): boolean {
    const cartItems = this.getCartItems();
    return cartItems.some((product) => product.id.toString() === productId);
  }

  clearCart() {
    this.cartItems = [];
    this.cartItems$.next(this.cartItems);
  }
}
