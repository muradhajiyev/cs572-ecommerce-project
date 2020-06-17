import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MenuListComponent} from "../../components/menu-list/menu-list.component";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [MenuListComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [MenuListComponent]
})
export class SharedModule { }
