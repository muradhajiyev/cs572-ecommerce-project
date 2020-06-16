import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";
import {ReviewStatus} from "../../models/review.enum";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ProductDetailsComponent implements OnInit {
  public productId: string;
  public product: Product;
  currentRate = 8;
  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _productService: ProductService) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
        this.productId =params.get('id');
        this.getProductDetails('5ee55f685a47f27910d69457');
      }
    );
  }

  public getProductDetails(productId){
      this._productService.getProductDetails(productId)
        .subscribe(product => {
            this.product = product['result'];
            let postedReviews = this.product.reviews.filter(review => {
              return review.status === ReviewStatus.Posted;
            });
            this.product.reviews = postedReviews;
        },
          (err) => {
              console.log('error in getting product details', err);
          });
  }

  public addToCart(){

  }

}
