import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product, ApiResponse, Paged } from '../models';
import { ProductForm } from '../models/product-form';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _http: HttpClient) {}

  public getProductDetails(productId: string) {
    return this._http.get('/api/products/' + productId);
  }

  public addToCart(prodId: string) {
    return this._http.post('/api/carts/', { productId: prodId });
  }

  getProducts(categoryId: string, pageNumber: number, pageSize: number) {
    let params = new HttpParams();
    if (categoryId && categoryId.toLowerCase() !== 'all') {
      params = params.set('categoryId', categoryId);
    }
    params = params
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    return this._http.get<ApiResponse<Paged>>('/api/products', {
      params: params,
    });
  }

  public createProduct(body: FormData) {
    return this._http.post('/api/products/', body);
  }
}
