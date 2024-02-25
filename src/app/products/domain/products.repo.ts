import {
  ApiResponse,
  AxiosApiResponse,
  responseError,
} from '../../api/domain/api.dto';
import BaseService from '../../api/services/base.service';
import { ResponseProductsDTO } from './types';

export class ProductsRepo extends BaseService {
  async getAllProducts(): Promise<ApiResponse<ResponseProductsDTO[]>> {
    try {
      const response = await this.api.get<
        void,
        AxiosApiResponse<ResponseProductsDTO[]>
      >('/products');
      return response.data;
    } catch (e: any) {
      return responseError(e.message);
    }
  }
}
