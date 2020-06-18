import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MenuListModel} from "../../models";
enum CurrentSection{
  PENDINGSELLERS = 'pending-sellers',
  PENDINGREVIEWS = 'pending-reviews'
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public currentSectionEnum = CurrentSection;
  public currentAdminSection;
  public menuListModel: MenuListModel = new MenuListModel("Admin", "pageType", [
    { id: "pending-sellers", text: "Pending sellers" },
    { id: "pending-reviews", text: "Pending reviews" }
  ], true);

  constructor(private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._route.queryParams.subscribe(params => {
      this.currentAdminSection = params.cat;
    });
  }

}
