import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminRoutingModule} from "./admin-routing.module";
import {AdminComponent} from "../../components/admin/admin.component";
import {SharedModule} from "../shared/shared.module";
import {PendingSellersComponent} from "../../components/pending-sellers/pending-sellers.component";
import {PendingReviewsComponent} from "../../components/pending-reviews/pending-reviews.component";



@NgModule({
  declarations: [
    AdminComponent,
    PendingSellersComponent,
    PendingReviewsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
