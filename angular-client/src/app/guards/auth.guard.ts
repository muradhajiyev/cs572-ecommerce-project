import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private router: Router, private authenticationService: AuthenticationService){}

  //basic
  canActivate(next: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var currentUser: User = this.authenticationService.currentUser;
    if(this.authenticationService.isAuthenticated && next.data.roles && next.data.roles.indexOf(currentUser.role)) return true;
    
    this.router.navigate(['/auth']);
    return false;
  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
