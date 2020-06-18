import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { timeout } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from 'src/app/models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuthenticated: boolean = false;
  currentUser: User;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.authService.isAuthenticated.subscribe(x => {
      this.isAuthenticated = x;
      this.currentUser = this.authService.currentUser;
    });
  }

  logout(){
    this.authService.logout().then(() => {
    });
  }

}
