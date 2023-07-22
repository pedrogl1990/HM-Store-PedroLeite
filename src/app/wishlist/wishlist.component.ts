import { Component } from '@angular/core';
import { Product } from '../interfaces/product';
import { WishlistService } from '../services/wishlist.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent {
  wishlist: Product[] = [];

  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService
  ) {
    this.wishlistService
      .getWishlistFromDatabase()
      .subscribe((wishlist: Product[]) => {
        this.wishlist = wishlist.filter((product) => product.favorito);
      });
  }

  removeFromWishlist(product: Product): void {
    this.wishlistService.removeFromWishlist(product.id).subscribe(() => {
      this.wishlist = this.wishlist.filter((item) => item.id !== product.id);
    });
  }

  addToCartAndRemoveFromWishlist(product: Product): void {
    this.cartService.addToCart(product);
    this.removeFromWishlist(product);
  }

  isAddedToCart(product: Product): boolean {
    return this.cartService.isProductInCart(product.id.toString());
  }
}
