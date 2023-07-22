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
  pageProducts: Product[] = [];
  filteredProducts!: Product[];
  currentSearch = '';
  loadAmount = 10;
  currentPage = 0;
  hasNextPage = true;
  hasPreviousPage = false;
  totalProducts = 0;
  totalOverallProducts = 0;
  showConfirmation = false;
  productToDelete: Product | null = null;

  constructor(
    private productsService: ProductsService,
    private productUpdatedService: ProductUpdateService,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.productsService.getAllProducts().subscribe(
      (products) => {
        this.totalOverallProducts = products.length;
        this.loadAllProducts();
      },
      (error) => console.error('Erro ao obter todos os produtos:', error)
    );

    this.productUpdatedService.productUpdated$.subscribe(() => {
      this.loadAllProducts();
    });

    this.searchService.currentSearch.subscribe((searchTerm) => {
      this.currentSearch = searchTerm;
      this.applyFilter();
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
          this.pageProducts = products;
          this.hasNextPage = products.length === this.loadAmount;
          this.hasPreviousPage = this.currentPage > 0;
          this.applyFilter();
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

  showConfirmDialog(product: Product) {
    this.productToDelete = product;
    this.showConfirmation = true;
  }

  deleteProduct() {
    if (this.productToDelete) {
      this.productsService.removeProduct(this.productToDelete.id).subscribe(
        () => {
          this.totalOverallProducts -= 1;
          this.loadAllProducts();
          this.cancelDelete();
        },
        (error) => {
          console.log('Erro ao eliminar o produto:', error);
          this.cancelDelete();
        }
      );
    }
  }

  cancelDelete() {
    this.productToDelete = null;
    this.showConfirmation = false;
  }

  toggleHighlight(product: Product) {
    this.productsService
      .getHighlightedProducts()
      .subscribe((highlightedProducts) => {
        if (highlightedProducts.length < 8 || product.destaque) {
          product.destaque = !product.destaque;
          this.productsService.updateProduct(product).subscribe(
            () => console.log('Estado de destaque atualizado com sucesso!'),
            (error) =>
              console.log('Erro ao atualizar o estado de destaque:', error)
          );
        } else {
          alert('Já existem 8 produtos em destaque.');
        }
      });
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

  applyFilter() {
    if (this.currentSearch) {
      this.filteredProducts = this.pageProducts.filter((product) =>
        product.nome.toLowerCase().includes(this.currentSearch.toLowerCase())
      );
    } else {
      this.filteredProducts = this.pageProducts;
    }

    this.totalProducts = this.filteredProducts.length;
    this.hasNextPage = this.filteredProducts.length === this.loadAmount;
  }
}
