import { Product } from './product';

export class Paged{
    items:Product[] = [];
    currentPage: number = 1;
    pages: number = 0;
    total: number = 0;
}