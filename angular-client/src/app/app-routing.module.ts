import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import {ProductDetailsComponent} from "./components/product-details/product-details.component";
import { AuthGuard } from './guards/auth.guard';
import { RedirectGuard } from './guards/redirect.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full' , component: HomeComponent },
  { path: 'product/:id', component: ProductDetailsComponent},
  { path: 'auth', loadChildren: () => import('./modules/authentication/authentication.module').then(m=>m.AuthenticationModule)},
  { path: 'profile',  canActivate: [RedirectGuard], component: HomeComponent },
  { path: 'buyer', loadChildren: () => import('./modules/buyer/buyer.module').then(m=>m.BuyerModule), canLoad: [AuthGuard]},
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m=>m.AdminModule), canLoad: [AuthGuard]},
  { path: 'seller', loadChildren: () => import('./modules/seller/seller.module').then(m=>m.SellerModule), canLoad: [AuthGuard]}
 
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
