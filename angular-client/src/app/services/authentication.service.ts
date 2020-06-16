import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User, ApiResponse } from '../models';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  jwtHelper: JwtHelperService;

  constructor(private http: HttpClient) {
      this.jwtHelper = new JwtHelperService();
   }


  public get isAuthenticated(){
    const token = localStorage.getItem('token');
    return token && !this.jwtHelper.isTokenExpired(token);
  }

  public get currentUser(): User{
    if (!this.isAuthenticated) return;

    const token = localStorage.getItem('token');
    const payload = this.jwtHelper.decodeToken(token);
    return payload;
  }

  login(username: string, password: string){
    return this.http.post<ApiResponse<Token>>("/api/auth/login", {email: username, password: password})
        .pipe(map(res => {
            localStorage.setItem("token", res.result.access_token);
            return res;
        }));
  }

  // basic
  logout(){
    localStorage.removeItem('token');
  }
}


interface Token{
  access_token: string;
}