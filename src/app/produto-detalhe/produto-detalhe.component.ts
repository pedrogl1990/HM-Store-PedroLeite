import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-produto-detalhe',
  templateUrl: './produto-detalhe.component.html',
  styleUrls: ['./produto-detalhe.component.css'],
})
export class ProdutoDetalheComponent implements OnInit {
  product!: Product;
  isAddedToCart: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get(`http://localhost:3000/produtos/${id}`).subscribe((data) => {
      this.product = data as Product;
      this.isAddedToCart = this.cartService.isProductInCart(
        this.product.id.toString()
      );
    });
  }

  searchLocalStorage() {
    return localStorage.getItem('loggedUser');
  }

  addToCart(product: Product) {
    if (!this.isAddedToCart) {
      this.cartService.addToCart(product);
      this.isAddedToCart = true;
    }
  }
}
