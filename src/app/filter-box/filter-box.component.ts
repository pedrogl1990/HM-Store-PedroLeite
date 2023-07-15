import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-filter-box',
  templateUrl: './filter-box.component.html',
  styleUrls: ['./filter-box.component.css'],
})
export class FilterBoxComponent {
  @Input() clothColors: string[] = [];
  @Input() clothTypes: string[] = [];
  @Output() filtersChanged = new EventEmitter<{
    color: string;
    type: string;
  }>();
  @Input() productsList: Product[] = [];

  selectedColor: string = '';
  selectedType: string = 'todos';
  filteredColors: string[] = [];
  filteredTypes: string[] = [];
  resultsCount: number = 0;

  ngOnInit() {
    this.filteredColors = this.clothColors;
    this.filteredTypes = this.clothTypes;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['clothColors'] ||
      changes['clothTypes'] ||
      changes['selectedColor'] ||
      changes['selectedType']
    ) {
      if (this.selectedType && this.selectedType !== 'todos') {
        this.filteredColors = this.filterColors();
      }
      if (this.selectedColor && this.selectedColor !== 'todos') {
        this.filteredTypes = this.filterTypes();
      }
    }
  }

  onFiltersChanged(color: string, type: string) {
    this.selectedColor = color;
    this.selectedType = type;
    this.filtersChanged.emit({ color, type });
  }

  filterColors(): string[] {
    if (this.selectedType && this.selectedType !== 'todos') {
      return this.clothColors.filter((color) =>
        this.productsList.some(
          (product) =>
            product.cor === color &&
            product.tipo_de_produto === this.selectedType
        )
      );
    } else {
      return [];
    }
  }

  filterTypes(): string[] {
    if (this.selectedColor && this.selectedColor !== 'todos') {
      return this.clothTypes.filter((type) =>
        this.productsList.some(
          (product) =>
            product.cor === this.selectedColor &&
            product.tipo_de_produto === type
        )
      );
    } else {
      return [];
    }
  }
}
