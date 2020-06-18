import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateProductForm } from 'src/app/components/seller/create-product-form/create-product-form.component';
import { SellerProfileComponent } from 'src/app/components/seller/seller-profile/seller-profile.component';
import { SharedModule } from '../shared/shared.module';
import { SellerRoutingModule } from './seller-routing.module';
import { SellerOrdersComponent } from 'src/app/components/seller/seller-orders/seller-orders.component';
import { ProductsComponent } from 'src/app/components/seller/products/products.component';
@NgModule({
  declarations: [
    SellerProfileComponent,
    CreateProductForm,
    SellerOrdersComponent,
    ProductsComponent
  ],
  imports: [
    FormsModule,
    CommonModule, 
    SharedModule, 
    ReactiveFormsModule,
    SellerRoutingModule 
    ],
  exports: [SellerProfileComponent]
})
export class SellerModule {
  constructor() {
  }
}
