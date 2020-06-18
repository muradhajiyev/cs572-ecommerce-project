import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BuyerProfileComponent } from 'src/app/components/buyer/buyer-profile/buyer-profile.component';
import { AddressesComponent } from 'src/app/components/buyer/addresses/addresses.component';
import { BillingInfoComponent } from 'src/app/components/buyer/billing-info/billing-info.component';
import { OrdersComponent } from 'src/app/components/buyer/orders/orders.component';
import { ShoppingCartComponent } from 'src/app/components/buyer/shopping-cart/shopping-cart.component';
import { AddressEditorComponent } from 'src/app/components/buyer/address-editor/address-editor.component';
import { BillingInfoEditorComponent } from 'src/app/components/buyer/billing-info-editor/billing-info-editor.component';


const routes: Routes = [
  { path: '', component: BuyerProfileComponent,children:
    [
      {path:'addresses', component: AddressesComponent},
      {path:'addresses/add', component: AddressEditorComponent},
      {path:'addresses/edit/:id', component: AddressEditorComponent},
      {path:'billing-infos', component: BillingInfoComponent},
      {path:'billing-infos/add', component: BillingInfoEditorComponent},
      {path:'billing-infos/edit/:id', component: BillingInfoEditorComponent},
      {path:'orders', component: OrdersComponent},
      {path:'shopping-cart', component: ShoppingCartComponent}
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],

  exports: [RouterModule]
})
export class BuyerRoutingModule { }
