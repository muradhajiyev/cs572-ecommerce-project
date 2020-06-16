import {ReviewStatus} from "./review.enum";

export class Review {
  buyerId: string;
  status: ReviewStatus;
  createdDate: Date;
  stars: number;
  comment: string;
  decisionDate: Date;
}
