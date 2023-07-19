import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductUpdateService {
  constructor() {}

  private productUpdatedSource = new Subject<void>();

  productUpdated$ = this.productUpdatedSource.asObservable();

  notifyProductUpdate() {
    this.productUpdatedSource.next();
  }
}
