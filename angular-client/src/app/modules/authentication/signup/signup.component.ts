import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  loading:boolean =false;
  error = '';
  success = '';

  constructor(private authService: AuthenticationService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated)
    this.router.navigate(["/"])

  this.signupForm = this.fb.group({
    role: ['seller', Validators.required],
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });
  }

  onSubmit() {
    this.loading = true;
    this.error = '';
    this.success = '';
    this.authService.signup(this.signupForm.value).subscribe((res => {
      this.loading=false;
      this.success = "You have registered successfully.";
    }), err => {
      this.loading = false;
      this.error = err.error.result.message;
    });
  }

}
