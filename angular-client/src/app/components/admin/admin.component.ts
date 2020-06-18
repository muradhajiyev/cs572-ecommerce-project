import { Component, OnInit } from '@angular/core';
import {MenuListModel} from "../../models/menu-list";
import {ActivatedRoute} from "@angular/router";
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
  ]);
  public pendingSellersHeaderTitles = ['Seller name','Seller email','Actions'];
  public pendingReviewsHeaderTitles = ['Buyer','Order Product','Created date', 'Stars', 'Comment', 'Actions'];
  public PendingSellersActionTitles = ['Approve', 'Reject'];
  public PendingReviewsActionTitles = ['Post', 'Decline'];
  public pendingSellersData: any;
  public pendingReviewsData: any;

  constructor(private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._route.queryParams.subscribe(params => {
      this.currentAdminSection = params.cat;
    });
  }

  public approvePendingSellers(event){

  }

  public rejectPendingSellers(event){

  }

  public approvePendingReviews(event){

  }

  public rejectPendingReviews(event){

  }

}
