import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyerProfileComponent } from 'src/app/components/buyer/buyer-profile/buyer-profile.component';
import { SharedModule } from '../shared/shared.module';
import { BuyerRoutingModule } from './buyer-routing.module';
import { AddressesComponent } from 'src/app/components/buyer/addresses/addresses.component';
import { BillingInfoComponent } from 'src/app/components/buyer/billing-info/billing-info.component';
import { OrdersComponent } from 'src/app/components/buyer/orders/orders.component';
import { ShoppingCartComponent } from 'src/app/components/buyer/shopping-cart/shopping-cart.component';



@NgModule({
  declarations: [
    BuyerProfileComponent,
    AddressesComponent,
    BillingInfoComponent,
    OrdersComponent,
    ShoppingCartComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BuyerRoutingModule,
  ],
  exports: [BuyerProfileComponent]
})
export class BuyerModule {
  constructor(){
    console.log("buyer module constructor");
  }
 }
