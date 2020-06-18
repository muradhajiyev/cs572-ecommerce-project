import {Review} from "./review";

export class Product {
  _id: string;
  title: string;
  categoryId: string;
  price: string;
  imageName: string;
  imageUrl: string;
  description: string;
  sellerId: string;
  reviews: Review[];
}