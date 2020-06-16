import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  jwtHelper: JwtHelperService;

  constructor() {
      this.jwtHelper = new JwtHelperService();
   }

  // basic
  isAuthenticated(){
    const token = localStorage.getItem('token');
    return token && !this.jwtHelper.isTokenExpired(token);
  }

  public get currentUser(): User{
    const token = localStorage.getItem('token');
    const payload = this.jwtHelper.decodeToken(token);
    return payload;
  }

  login(username: string, password: string){}

  // basic
  logout(){
    localStorage.removeItem('token');
  }
}
