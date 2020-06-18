import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { CreateProductForm } from 'src/app/components/seller/create-product-form/create-product-form.component';
import { SellerProfileComponent } from 'src/app/components/seller/seller-profile/seller-profile.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { SellerRoutingModule } from './seller-routing.module';
@NgModule({
  declarations: [SellerProfileComponent, CreateProductForm],
  imports: [CommonModule, SharedModule, SellerRoutingModule, FormsModule],
  //exports: [SellerProfileComponent],
})
export class SellerModule {
  constructor() {
    console.log('sellermodule constructor');
  }
}
