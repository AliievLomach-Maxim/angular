import { Injectable } from '@angular/core';
import { IResponseError } from '../../api/domain/api.dto';
import { AppService } from '../../shared/services/abstr.service';
import { ProductsRepo } from '../domain/products.repo';
import { ResponseProductsDTO } from '../domain/types';

export type DriverState = {
  products: ResponseProductsDTO | null;
};

export const defaultState: DriverState = {
  products: null,
};
@Injectable({
  providedIn: 'root',
})
export class ProductService extends AppService<DriverState> {
  private readonly repo: ProductsRepo = new ProductsRepo();

  constructor() {
    super(defaultState);
  }

  async getAllProducts(): Promise<ResponseProductsDTO[]> {
    const response = await this.repo.getAllProducts();
    if (response instanceof IResponseError) {
      console.error('Creation error:', response.message);
      return [];
    }
    return response;
  }
}
