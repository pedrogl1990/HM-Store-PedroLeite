import { Component, Input } from '@angular/core';
import { Product } from '../interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css'],
})
export class ProdutosComponent {
  @Input() title: string = '';
  productsList: Product[] = [];
  visibleProducts: Product[] = [];

  category: string = '';

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.category = params.get('categoria') ?? '';
      this.productsService
        .getProductsByCategory(this.category)
        .subscribe((products) => {
          this.title = this.category;
          this.productsList = products;
          this.visibleProducts = products.slice(0, 6);
        });
    });
  }

  ShowMoreProducts() {
    const currentVisibleProducts = this.visibleProducts.length;
    const nextProducts = this.productsList.slice(
      currentVisibleProducts,
      currentVisibleProducts + 6
    );
    this.visibleProducts = this.visibleProducts.concat(nextProducts);
  }
}
