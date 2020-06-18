import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import {Role, User} from 'src/app/models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuthenticated: boolean = false;
  currentUser: User;
  CurrentRole = Role;
  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.authService.authenticatedSubject.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
      this.currentUser = this.authService.currentUser;
    });
  }

  logout(){
    this.authService.logout().then(() => {
    });
  }

}
