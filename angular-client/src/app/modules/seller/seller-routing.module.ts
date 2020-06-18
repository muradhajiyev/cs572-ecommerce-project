import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CreateProductForm } from 'src/app/components/seller/create-product-form/create-product-form.component';
import { SellerProfileComponent } from 'src/app/components/seller/seller-profile/seller-profile.component';
import { SellerProductList } from 'src/app/components/seller/product-list/seller-product-list.component';
import { SellerOrdersComponent } from 'src/app/components/seller/seller-orders/seller-orders.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { Role } from 'src/app/models';

const routes: Routes = [
  {
    path: '',
    component: SellerProfileComponent,
    canActivate: [AuthGuard], 
    data: {roles: [Role.Seller]}, 
    children: [
      {
        path: 'products',
        component: SellerProductList,
      },
      { path: 'add', component: CreateProductForm },
      {
        path: 'orders',
        component: SellerOrdersComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],

  exports: [RouterModule],
})
export class SellerRoutingModule {}
