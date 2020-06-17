import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product, ApiResponse, Paged } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(categoryId: string, pageNumber: number, pageSize: number){
    let params = new HttpParams();
    if(categoryId && categoryId.toLowerCase() !== "all"){
      params = params.set('categoryId', categoryId)
    }
    params = params
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<ApiResponse<Paged>>("/api/products", {params: params});
  }
}
