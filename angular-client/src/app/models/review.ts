import {ReviewStatus} from "./review.enum";

export class Review {
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
}
