import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgxStarsModule } from 'ngx-stars';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateProductForm } from './components/create-product-form/create-product-form.component';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from './components/product/product-card/product-card.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CreateProductForm,
    ProductDetailsComponent,
    ProductCardComponent,
    ProductListComponent,
    MenuListComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxStarsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
