import { Product } from './product';

export interface Order{
    _id: string;
    orderNumber: number;
    status: string;
    deliveredDate: Date,
    shippedDate: Date,
    products: Item[];
  }

  interface Item{
    product: Product;
    quantity: number;
    cashbackPayment: number;
    creditCardPayment: number;
    totalPayment: number;
  }