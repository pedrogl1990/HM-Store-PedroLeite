import { Component } from '@angular/core';
import { Product } from '../interfaces/product';
import { WishlistService } from '../services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent {
  wishlist: Product[] = [];

  constructor(private wishlistService: WishlistService) {
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
}
