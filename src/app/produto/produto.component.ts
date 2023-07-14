import { Component, Input } from '@angular/core';
import { Product } from '../interfaces/product';

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
  isHovered: boolean = false;

  showSecondaryImage() {
    this.isHovered = true;
  }

  hideSecondaryImage() {
    this.isHovered = false;
  }

  product!: Product;
}
