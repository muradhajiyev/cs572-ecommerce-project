import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AddressesComponent } from 'src/app/components/buyer/addresses/addresses.component';
import { BillingInfoComponent } from 'src/app/components/buyer/billing-info/billing-info.component';
import { OrdersComponent } from 'src/app/components/buyer/orders/orders.component';
import { ShoppingCartComponent } from 'src/app/components/buyer/shopping-cart/shopping-cart.component';
import { AddressEditorComponent } from 'src/app/components/buyer/address-editor/address-editor.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BuyerRoutingModule } from './buyer-routing.module';
import { BuyerProfileComponent } from 'src/app/components/buyer/buyer-profile/buyer-profile.component';
import { BillingInfoEditorComponent } from 'src/app/components/buyer/billing-info-editor/billing-info-editor.component';



@NgModule({
  declarations: [
    BuyerProfileComponent,
    AddressesComponent,
    BillingInfoComponent,
    OrdersComponent,
    ShoppingCartComponent,
    AddressEditorComponent,
    BillingInfoEditorComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    BuyerRoutingModule
  ],
  exports: [BuyerProfileComponent]
})
export class BuyerModule {
  constructor(){
  }
 }
