import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { ProductListComponent } from './components/product/product-list/product-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full' ,component: HomeComponent, //canActivate: [AuthGuard] 
},
{ path: 'home', pathMatch: 'full' ,component: HomeComponent },
  { path: 'auth', loadChildren: () => import('./modules/authentication/authentication.module').then(m=>m.AuthenticationModule)},
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m=>m.AdminModule)},
  { path: 'buyer', loadChildren: () => import('./modules/buyer/buyer.module').then(m=>m.BuyerModule)},
  { path: 'seller', loadChildren: () => import('./modules/seller/seller.module').then(m=>m.SellerModule)}
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
