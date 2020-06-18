import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { Role } from 'src/app/models';
import { PendingSellersComponent } from 'src/app/components/pending-sellers/pending-sellers.component';
import { PendingReviewsComponent } from 'src/app/components/pending-reviews/pending-reviews.component';
import { AdminComponent } from 'src/app/components/admin/admin.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'view' },
  { path: 'view', component: AdminComponent, canActivate: [AuthGuard], data: {roles: [Role.Admin]},  children: [
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
