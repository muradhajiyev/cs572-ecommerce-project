import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../services/admin.service";
import {ReviewStatus} from "../../models/review.enum";

interface ReviewShape {
  review: {
    _id: string;
    buyer: {
      buyerId: string,
      name: string,
      email: string,
    };
    status: ReviewStatus;
    createdDate: Date;
    stars: number;
    comment: string;
    decisionDate: Date;
  };
  productDetails: {
    productId: string;
    title: string;
  };
}


@Component({
  selector: 'app-pending-reviews',
  templateUrl: './pending-reviews.component.html',
  styleUrls: ['./pending-reviews.component.css']
})
export class PendingReviewsComponent implements OnInit {
  public headerTitles = ['Buyer','Order Product','Created date', 'Stars', 'Comment', 'Actions'];
  public actionTitles = ['Post', 'Decline'];
  public pendingReviews: ReviewShape[];

  constructor(private _adminService: AdminService) { }

  ngOnInit(): void {
    this.getPendingReviews();
  }

  public getPendingReviews(){
    this._adminService.getPendingReviews().subscribe(
      (reviews: ReviewShape[]) => {
        this.pendingReviews = reviews['result'];
      },
      (err) => {
        console.log("can't get pending reviews");
      }
    );
  }

  public approveReview(productId, reviewId) {
    const productIdString = productId.toString();
    const reviewIdString = reviewId.toString();
    this._adminService.approveReview(productIdString, reviewIdString).subscribe(
      () => {
        this.pendingReviews = this.pendingReviews.filter( pendingReview => {
          return pendingReview.review['_id'] != reviewIdString;
        });
        console.log('Review Posted');
      },
      (err) => {
        console.log('error in posting review: ', err);
      }
    );
  }

  public rejectReview(productId, reviewId) {
    const productIdString = productId.toString();
    const reviewIdString = reviewId.toString();
    this._adminService.rejectReview(productIdString, reviewIdString).subscribe(
      () => {
        this.pendingReviews = this.pendingReviews.filter( pendingReview => {
          return pendingReview.review['_id'] != reviewIdString;
        });
        console.log('Review Rejected');
      },
      (err) => {
        console.log('error in rejecting review: ', err);
      }
    );
  }

}
