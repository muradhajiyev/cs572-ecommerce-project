import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http: HttpClient) { }

  public getProductDetails(productId){
    return this._http.get('/api/products/' + productId);
  }

}
