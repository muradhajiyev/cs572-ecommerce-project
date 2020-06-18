import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Role } from '../models';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {

  constructor(private authService: AuthenticationService,private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.authService.isAuthenticated)
        return false;
      
      if(this.authService.currentUser.role == Role.Admin)
        this.router.navigate(['admin'])

      if(this.authService.currentUser.role == Role.Seller)
        this.router.navigate(['seller/products'])

      if(this.authService.currentUser.role == Role.Buyer)
        this.router.navigate(['buyer'])

    return false;
  }
  
}
