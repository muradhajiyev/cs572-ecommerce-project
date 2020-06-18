import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from "../../components/admin/admin.component";
import {PendingSellersComponent} from "../../components/pending-sellers/pending-sellers.component";
import {PendingReviewsComponent} from "../../components/pending-reviews/pending-reviews.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'view' },
  { path: 'view', component: AdminComponent, children: [
      {path: 'pending-sellers', component: PendingSellersComponent },
      {path: 'pending-reviews', component: PendingReviewsComponent }
    ]},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
