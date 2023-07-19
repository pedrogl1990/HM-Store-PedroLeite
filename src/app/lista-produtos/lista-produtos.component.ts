import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../interfaces/product';
import { ProductUpdateService } from '../services/product-update.service';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css'],
})
export class ListaProdutosComponent {
  products!: Product[];
  secondImageVisible = false;

  constructor(
    private productsService: ProductsService,
    private productUpdatedService: ProductUpdateService
  ) {}

  ngOnInit() {
    this.loadAllProducts();

    this.productUpdatedService.productUpdated$.subscribe(() => {
      this.loadAllProducts();
    });
  }

  loadAllProducts() {
    this.productsService.getAllProducts().subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        console.error('Erro ao carregar produtos:', error);
      }
    );
  }

  showSecondImage(product: Product) {
    if (product.foto_secundaria) {
      this.secondImageVisible = true;
    }
  }

  hideSecondImage() {
    this.secondImageVisible = false;
  }

  removeProduct(product: Product) {
    this.productsService.removeProduct(product.id).subscribe(
      () => {
        this.loadAllProducts();
      },
      (error) => {
        console.log('Erro ao eliminar o produto:', error);
      }
    );
  }
}
