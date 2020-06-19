import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, Review } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private _http: HttpClient) {}

  public getReviewByProduct(productId): Observable<ApiResponse<Review>> {
    return this._http.get<ApiResponse<Review>>(`/api/reviews/user/product/${productId}`);
  }


  public saveOrUpdateReview(productId: string, stars: string, comment: string): Observable<ApiResponse<{success: string}>>{
    return this._http.post<ApiResponse<{success: string}>>(`/api/reviews/product/${productId}`, { stars: stars, comment: comment });
  }
}
