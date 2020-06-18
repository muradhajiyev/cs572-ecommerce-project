import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading:boolean =false;
  error = '';

  constructor(private authService: AuthenticationService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  onSubmit() {
    this.loading = true;
 
    this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value).subscribe(
      res => {this.router.navigate(["/"]);},
      error => {
        //todo: handle error friendly.
        console.log(error);
        this.error = error;
        this.loading = false;
    }
    )
  }

}
