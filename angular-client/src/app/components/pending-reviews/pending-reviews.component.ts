import { Component, OnInit } from '@angular/core';
import {Review} from "../../models/review";
import {AdminService} from "../../services/admin.service";
import {User} from "../../models";

@Component({
  selector: 'app-pending-reviews',
  templateUrl: './pending-reviews.component.html',
  styleUrls: ['./pending-reviews.component.css']
})
export class PendingReviewsComponent implements OnInit {
  public headerTitles = ['Buyer','Order Product','Created date', 'Stars', 'Comment', 'Actions'];
  public actionTitles = ['Post', 'Decline'];
  public pendingReviews: Review[];

  constructor(private _adminService: AdminService) { }

  ngOnInit(): void {
    this.getPendingReviews();
  }

  public getPendingReviews(){
    this._adminService.getPendingReviews().subscribe(
      (reviews: Review[]) => {
        this.pendingReviews = reviews['result'];
      },
      (err) => {
        console.log("can't get pending reviews");
      }
    );
  }

  public approveReview(sellerId) {
  //   let sellerIdString = sellerId.toString();
  //   this._adminService.approveSeller(sellerIdString).subscribe(
  //     () => {
  //       this.pendingSellers = this.pendingSellers.filter( seller => {
  //         return seller['_id'] != sellerIdString;
  //       });
  //       console.log('seller Approved');
  //     },
  //     (err) => {
  //       console.log('error in approving seller: ', err);
  //     }
  //   );
  }

  public rejectReview(sellerId) {
  //   let sellerIdString = sellerId.toString();
  //   this._adminService.rejectSeller(sellerIdString).subscribe(
  //     () => {
  //       this.pendingSellers = this.pendingSellers.filter( seller => {
  //         return seller['_id'] != sellerIdString;
  //       });
  //       console.log('seller rejected');
  //     },
  //     (err) => {
  //       console.log('error in rejecting seller: ', err);
  //     }
  //   );
  }

}
