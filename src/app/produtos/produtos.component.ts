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
  clothColors: string[] = [];
  clothTypes: string[] = [];
  selectedColor: string = '';
  selectedType: string = '';
  filteredProductsCount: number = 0;
  category: string = '';
  allProducts: Product[] = [];

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
          this.allProducts = products;
          this.visibleProducts = products.slice(0, 6);
          const uniqueColors = new Set<string>();
          const uniqueClothTypes = new Set<string>();
          products.forEach((product) => {
            uniqueColors.add(product.cor);
            uniqueClothTypes.add(product.tipo_de_produto);
          });
          this.clothColors = Array.from(uniqueColors);
          this.clothTypes = Array.from(uniqueClothTypes);

          this.handleFiltersChanged({ color: 'todos', type: 'todos' });
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

  handleFavoriteChanged(event: { product: Product; favorite: boolean }) {
    event.product.favorito = event.favorite;
  }

  handleFiltersChanged(filters: { color: string; type: string }) {
    const { color, type } = filters;
    this.selectedColor = color;
    this.selectedType = type;

    let filteredProducts = this.productsList;

    if (color && color !== 'todos') {
      filteredProducts = filteredProducts.filter(
        (product) => product.cor === color
      );
    }

    if (type && type !== 'todos') {
      filteredProducts = filteredProducts.filter(
        (product) => product.tipo_de_produto === type
      );
    }

    this.visibleProducts = filteredProducts.slice(0, 6);

    this.filteredProductsCount = filteredProducts.length;

    this.updateAvailableFilters();
  }

  updateAvailableFilters() {
    let filteredProducts = this.productsList;

    if (this.selectedColor && this.selectedColor !== 'todos') {
      filteredProducts = filteredProducts.filter(
        (product) => product.cor === this.selectedColor
      );
    }

    if (this.selectedType && this.selectedType !== 'todos') {
      filteredProducts = filteredProducts.filter(
        (product) => product.tipo_de_produto === this.selectedType
      );
    }

    const uniqueColors = new Set<string>();
    const uniqueClothTypes = new Set<string>();
    filteredProducts.forEach((product) => {
      uniqueColors.add(product.cor);
      uniqueClothTypes.add(product.tipo_de_produto);
    });
    this.clothColors = Array.from(uniqueColors);
    this.clothTypes = Array.from(uniqueClothTypes);
  }
}
