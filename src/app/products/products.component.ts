import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { ProductService } from './services/products.service';
import { ResponseProductsDTO } from './domain/types';
import { CardComponent } from '../shared/components/card/card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardComponent, NgFor],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  products: ResponseProductsDTO[] = [];
  service = inject(ProductService);

  constructor() {
    this.service.getAllProducts().then((res) => (this.products = res));
  }
}
