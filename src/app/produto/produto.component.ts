import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../interfaces/product';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css'],
})
export class ProdutoComponent {
  @Input() productMainImage: string = '';
  @Input() productSecondImage: string = '';
  @Input() productBrand: string = '';
  @Input() productName: string = '';
  @Input() productPrice: string = '';
  @Input() isFavorite: boolean = false;
  @Output() favoriteChanged = new EventEmitter<{
    product: Product;
    favorite: boolean;
  }>();

  isHovered: boolean = false;
  wishlist!: Product[];
  favoriteStatusAlertMessage: string = '';
  showMessage: boolean = false;

  private baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {
    this.wishlist = [];
  }

  showSecondaryImage() {
    this.isHovered = true;
  }

  hideSecondaryImage() {
    this.isHovered = false;
  }

  searchLocalStorage() {
    return localStorage.getItem('loggedUser');
  }

  markFavorite() {
    this.wishlist.push(this.product);
    this.updateFavoriteStatus(true);
    this.favoriteChanged.emit({ product: this.product, favorite: true });
    this.showMessage = true;
    this.favoriteStatusAlertMessage = 'Produto adicionado à wishlist.';
    setTimeout(() => {
      this.showMessage = false;
    }, 2000);
  }

  unmarkFavorite() {
    const index = this.wishlist.findIndex(
      (item) => item.id === this.product.id
    );
    if (index != -1) {
      this.wishlist.splice(index, 1);
    }
    this.updateFavoriteStatus(false);
    this.favoriteChanged.emit({ product: this.product, favorite: false });
    this.showMessage = true;
    this.favoriteStatusAlertMessage = 'Produto removido da wishlist.';
    setTimeout(() => {
      this.showMessage = false;
    }, 2000);
  }

  private updateFavoriteStatus(favorite: boolean) {
    const url = `${this.baseUrl}/produtos/${this.product.id}`;
    this.http.patch(url, { favorito: favorite }).subscribe(
      () => {
        console.log('atualização bem sucedida');
      },
      (error) => {
        console.log(
          'Erro ao atualizar o valor de "favorito" no servidor',
          error
        );
      }
    );
  }

  @Input() product!: Product;
}
