import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User, ApiResponse } from '../models';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  jwtHelper: JwtHelperService;
  public authenticatedSubject: BehaviorSubject<boolean>;
  // public isAuthenticated: Observable<boolean>;

  constructor(private http: HttpClient) {
      this.jwtHelper = new JwtHelperService();
      // this.isAuthenticatedSubject = new BehaviorSubject<boolean>(this.currentUser != null);
      // this.isAuthenticated = this.isAuthenticatedSubject.asObservable();

      this.authenticatedSubject = new BehaviorSubject<boolean>(this.currentUser != null);
   }

  public get isAuthenticated(){
    const token = localStorage.getItem('token');
    return token && !this.jwtHelper.isTokenExpired(token);
  }


  public get currentUser(): User{
    const token = localStorage.getItem('token');
    const payload = this.jwtHelper.decodeToken(token);
    return payload;
  }

  login(username: string, password: string){
    
    return this.http.post<ApiResponse<Token>>("/api/auth/login", {email: username, password: password})
        .pipe(map(res => {
            localStorage.setItem("token", res.result.access_token);
            this.authenticatedSubject.next(true);
            return res;
        }));
  }

  // basic
  logout(){
    return new Promise((resolve, reject) => {
      localStorage.removeItem('token');
      this.authenticatedSubject.next(false);
      resolve();
    })
  }
}


interface Token{
  access_token: string;
}