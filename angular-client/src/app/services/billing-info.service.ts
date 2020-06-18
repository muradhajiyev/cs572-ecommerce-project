import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BillingInfo, ApiResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BillingInfoService {

  constructor(private _http: HttpClient) { }
  getMyBillingInfos(){
    return this._http.get<ApiResponse<BillingInfo[]>>("/api/billing-info");
  }
  getMyBillingInfo(id){
    return this._http.get<ApiResponse<BillingInfo>>("/api/billing-info/"+id);
  }
  editBillingInfo(id, data){
    return this._http.put<ApiResponse<{success:string}>>("/api/billing-info/"+id, data);
  }
  addBillingInfo(data){
    return this._http.post<ApiResponse<{success:string}>>("/api/billing-info", data);
  }
  deleteBillingInfo(id){
    return this._http.delete<ApiResponse<{success:string}>>("/api/billing-info/"+id);
  }
}
