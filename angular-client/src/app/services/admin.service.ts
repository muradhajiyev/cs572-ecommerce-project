import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http: HttpClient) { }

  public getPendingSellers(){
    return this._http.get('/api/users/pending');
  }
  public getPendingReviews(){
    return this._http.get('/api/users/reviews/pending');
  }

  public approveSeller(sellerId: string){
    return this._http.post('/api/users/sellers/' + sellerId + '/approve', null);
  }

  public rejectSeller(sellerId: string){
    return this._http.post('/api/users/sellers/' + sellerId + '/reject', null);
  }

  public approveReview(productId: string, reviewId: string){
    return this._http.post('/api/users/product/' + productId + '/review/' + reviewId + '/post', null);
  }

  public rejectReview(productId: string, reviewId: string){
    return this._http.post('/api/users/product/' + productId + '/review/' + reviewId + '/reject', null);

  }
}
