import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';



@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    AuthenticationRoutingModule
  ],
  exports: [LoginComponent]
})
export class AuthenticationModule { }
