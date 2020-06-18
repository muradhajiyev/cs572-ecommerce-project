import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CreateProductForm } from 'src/app/components/seller/create-product-form/create-product-form.component';
import { SellerProfileComponent } from 'src/app/components/seller/seller-profile/seller-profile.component';
import { SellerProductList } from 'src/app/components/seller/product-list/seller-product-list.component';

const routes: Routes = [
  {
    path: '',
    component: SellerProfileComponent,
    children: [
      { path: 'myproducts', component: SellerProductList },
      { path: 'create-product', component: CreateProductForm },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],

  exports: [RouterModule],
})
export class SellerRoutingModule {}
