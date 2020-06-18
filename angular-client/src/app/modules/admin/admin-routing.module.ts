import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from "../../components/admin/admin.component";
import { AuthGuard } from 'src/app/guards/auth.guard';
import { Role } from 'src/app/models';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'view' },
  { path: 'view', component: AdminComponent, canActivate: [AuthGuard], data: {roles: [Role.Admin]}},
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
