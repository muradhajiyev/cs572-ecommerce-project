import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http: HttpClient) { }

  public getProductDetails(productId){
    return this._http.get(environment.API_ENDPOINT + '/api/products/' + productId);
  }

}
