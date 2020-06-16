import {Review} from "./review";

export class Product {
  title: string;
  categoryId: string;
  price: string;
  imageName: string;
  description: string;
  sellerId: string;
  reviews: Review[];
}
