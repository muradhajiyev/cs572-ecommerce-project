import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { ApiResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BuyerService {

  constructor(private _http: HttpClient) { }

  public getAvailableCashback(){
    return this._http.get<ApiResponse<{availableCashBack:number}>>('/api/users/available-cashback');
  }
  public getShoppingCart(){
    return this._http.get('/api/carts');
  }

  public removeProductFromShoppingCart(productId: string){
    return this._http.delete('/api/carts/' + productId);
  }

  public updateShoppingCart(productId: string, qty: number){
    return this._http.put('/api/carts/' + productId, {quantity: qty});
  }

}
