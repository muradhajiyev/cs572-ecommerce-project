import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BuyerProfileComponent } from 'src/app/components/buyer/buyer-profile/buyer-profile.component';
import { AddressesComponent } from 'src/app/components/buyer/addresses/addresses.component';
import { BillingInfoComponent } from 'src/app/components/buyer/billing-info/billing-info.component';
import { OrdersComponent } from 'src/app/components/buyer/orders/orders.component';
import { ShoppingCartComponent } from 'src/app/components/buyer/shopping-cart/shopping-cart.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { Role } from 'src/app/models';


const routes: Routes = [
  { path: '', component: BuyerProfileComponent, canActivate: [AuthGuard], data: {roles: [Role.Buyer]}, children:
    [
      {path:'addresses', component: AddressesComponent},
      {path:'billing-infos', component: BillingInfoComponent},
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
