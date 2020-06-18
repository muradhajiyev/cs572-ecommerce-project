import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CreateProductForm } from 'src/app/components/seller/create-product-form/create-product-form.component';
import { SellerProfileComponent } from 'src/app/components/seller/seller-profile/seller-profile.component';
import { SellerOrdersComponent } from 'src/app/components/seller/seller-orders/seller-orders.component';
import { ProductsComponent } from 'src/app/components/seller/products/products.component';

const routes: Routes = [
  {
    path: '',
    component: SellerProfileComponent,
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'products/add', component: CreateProductForm },
      { path: 'orders', component: SellerOrdersComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],

  exports: [RouterModule],
})
export class SellerRoutingModule { }
