import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http: HttpClient) { }

  public getProductDetails(productId: string){
    return this._http.get('/api/products/' + productId);
  }

  public addToCart(prodId: string){
      return this._http.post('/api/carts/', {productId: prodId});
  }

}
