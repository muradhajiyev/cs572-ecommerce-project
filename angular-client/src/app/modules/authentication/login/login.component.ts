import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.login();
  }


  login() {
    this.authService.login("corozza@gmail.com","123").subscribe(
      res => {
        console.log('success', res);
      },
      error => {
        console.log('error', error);
    }
    )
  }

}
