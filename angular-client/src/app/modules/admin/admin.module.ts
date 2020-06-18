import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { PendingSellersComponent } from 'src/app/components/pending-sellers/pending-sellers.component';
import { PendingReviewsComponent } from 'src/app/components/pending-reviews/pending-reviews.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';



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
