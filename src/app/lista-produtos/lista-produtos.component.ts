import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../interfaces/product';
import { ProductUpdateService } from '../services/product-update.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css'],
})
export class ListaProdutosComponent {
  products: Product[] = [];
  secondImageVisible = false;
  filteredProducts!: Product[];
  loadAmount = 10;
  currentPage = 0;

  constructor(
    private productsService: ProductsService,
    private productUpdatedService: ProductUpdateService,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.loadAllProducts();

    this.productUpdatedService.productUpdated$.subscribe(() => {
      this.loadAllProducts();
    });

    this.searchService.currentSearch.subscribe((searchTerm) => {
      if (searchTerm) {
        this.filteredProducts = this.products.filter((product) =>
          product.nome.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else {
        this.filteredProducts = this.products;
      }
    });
  }

  filterProducts(search: string) {
    if (search) {
      this.filteredProducts = this.products.filter((product) =>
        product.nome.toLowerCase().includes(search.toLowerCase())
      );
    } else {
      this.filteredProducts = this.products;
    }
  }
  loadAllProducts() {
    this.productsService
      .getSomeProducts(this.currentPage * this.loadAmount, this.loadAmount)
      .subscribe(
        (products) => {
          this.products = products;
          this.filteredProducts = products;
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

  loadMoreProducts() {
    this.loadAllProducts();
  }

  loadNextProducts() {
    this.currentPage += 1;
    this.loadAllProducts();
  }

  loadPreviousProducts() {
    this.currentPage = Math.max(0, this.currentPage - 1);
    this.loadAllProducts();
  }
}
