import { HttpClient } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { TypeProducts } from '../interfaces/product-type';
import { Product } from '../interfaces/product';
import { ProductsService } from '../services/products.service';
import { ProductUpdateService } from '../services/product-update.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-products-management',
  templateUrl: './products-management.component.html',
  styleUrls: ['./products-management.component.css'],
})
export class ProductsManagementComponent {
  isChecked: boolean = false;
  typeProducts!: TypeProducts[];

  isInputFilled: boolean = false;
  submitClicked: boolean = false;
  searchTerm: string = '';

  newProduct: Product = {
    id: 0,
    nome: '',
    marca: '',
    tipo_de_produto: '',
    cor: '',
    preco: '',
    descricao: '',
    foto_principal: '',
    foto_secundaria: '',
    destaque: false,
    categoria: '',
    favorito: false,
  };

  constructor(
    private http: HttpClient,
    private produtctsService: ProductsService,
    private productUpdatedService: ProductUpdateService,
    private searchService: SearchService
  ) {}

  search() {
    this.searchService.changeSearch(this.searchTerm);
  }

  clearSearch() {
    this.searchTerm = '';
    this.searchService.changeSearch(this.searchTerm);
  }

  toggleSwitch() {
    this.isChecked = !this.isChecked;
  }

  ngOnInit() {
    this.http
      .get<TypeProducts[]>('http://localhost:3000/tipos-produtos')
      .subscribe(
        (response) => {
          this.typeProducts = response;
        },
        (error) => {
          console.log('Ocorreu um erro a carregar o tipo de roupas', error);
        }
      );
  }

  addProduct(isChecked: boolean) {
    this.submitClicked = true;

    this.isInputFilled =
      !!this.newProduct.nome &&
      !!this.newProduct.marca &&
      !!this.newProduct.tipo_de_produto &&
      !!this.newProduct.cor &&
      !!this.newProduct.preco &&
      !!this.newProduct.descricao;

    if (!this.isInputFilled) {
      console.log('Por favor, preencha todos os campos!');
      return;
    }

    if (!this.newProduct.foto_principal) {
      this.newProduct.foto_principal = 'No_Image_Available.jpg';
    }
    if (!this.newProduct.foto_secundaria) {
      this.newProduct.foto_secundaria = 'No_Image_Available.jpg';
    }
    if (!this.newProduct.categoria) {
      this.newProduct.categoria = 'undefined';
    }

    this.newProduct.destaque = isChecked;

    this.produtctsService.addProduct(this.newProduct).subscribe(
      (addedProduct) => {
        console.log('Produto adicionado com sucesso!');

        this.newProduct.id = addedProduct.id;

        this.newProduct = {
          id: 0,
          nome: '',
          marca: '',
          tipo_de_produto: '',
          cor: '',
          preco: '',
          descricao: '',
          foto_principal: 'No_Image_Available.jpg',
          foto_secundaria: '',
          destaque: false,
          categoria: '',
          favorito: false,
        };

        this.isChecked = false;

        this.productUpdatedService.notifyProductUpdate();
      },
      (error) => {
        console.error('Erro ao adicionar o produto:', error);
      }
    );
  }
}
