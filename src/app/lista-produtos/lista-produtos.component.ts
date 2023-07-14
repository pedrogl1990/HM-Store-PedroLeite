import { Component, Input } from '@angular/core';
import { Product } from '../interfaces/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css'],
})
export class ListaProdutosComponent {
  @Input() resultados: string = '';
  listaProdutos: Product[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    // Lógica para determinar a categoria (homem, mulher, etc.)
    // e buscar a lista de produtos correspondente
    // utilizando o serviço de ProdutosService
    // e atribuir o título e a lista de produtos
    // às variáveis "titulo" e "listaProdutos"
  }
}
