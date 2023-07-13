import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  images: string[] = ['slider1', 'slider2', 'slider3'];
  title: string = 'SALDOS';
  highlightedProducts: Product[] = [];

  private url = 'http://localhost:3000/produtos';

  ngOnInit() {
    this.getProducts().subscribe((data: Product[]) => {
      this.highlightedProducts = data.filter(
        (product) => product.destaque === true
      );
    });
  }

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.url)
      .pipe(
        map((products) =>
          products.filter((product) => product.destaque === true)
        )
      );
  }
}
