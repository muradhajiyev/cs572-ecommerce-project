import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Address } from '../models/address';
import { ApiResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private _http: HttpClient) { }

  getMyAddresses(){
    return this._http.get<ApiResponse<Address[]>>("/api/addresses");
  }
  getMyAddress(id){
    return this._http.get<ApiResponse<Address>>("/api/addresses/"+id);
  }
  editAddress(addressId, data){
    return this._http.put<ApiResponse<{success:string}>>("/api/addresses/"+addressId, data);
  }
  addAddress(data){
    return this._http.post<ApiResponse<{success:string}>>("/api/addresses", data);
  }
  deleteAddress(addressId){
    return this._http.delete<ApiResponse<{success:string}>>("/api/addresses/"+addressId);
  }
}
