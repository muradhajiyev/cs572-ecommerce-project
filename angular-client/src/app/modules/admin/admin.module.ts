import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminRoutingModule} from "./admin-routing.module";
import {AdminComponent} from "../../components/admin/admin.component";
import {SharedModule} from "../shared/shared.module";
// import {AdminPendingTasksComponent} from "../../components/admin-pending-tasks/admin-pending-tasks.component";


@NgModule({
  declarations: [
    AdminComponent,
    // AdminPendingTasksComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
