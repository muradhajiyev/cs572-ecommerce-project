import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order, ApiResponse } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  public getOrders(): Observable<ApiResponse<Order[]>>{
    return this.httpClient.get<ApiResponse<Order[]>>('/api/orders');
  }

  public createOrder(data): Observable<ApiResponse<Order[]>>{
    return this.httpClient.post<ApiResponse<Order[]>>('/api/orders', data);
  }

  public cancelOrder(orderId): Observable<ApiResponse<Order>>{
    return this.httpClient.put<ApiResponse<Order>>(`/api/orders/${orderId}/cancel`, null);
  }

  public processOrder(orderId): Observable<ApiResponse<Order>>{
    return this.httpClient.put<ApiResponse<Order>>(`/api/orders/${orderId}/process`, null);
  }

  
}

