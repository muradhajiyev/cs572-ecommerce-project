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

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _productService: ProductService) {
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
        this.productId = params.get('id');
        //id for test
        this.getProductDetails('5ea1698cf1d0b8140cb05938');
      }
    );
  }

  public getProductDetails(productId) {
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

  public addToCart() {
    this._productService.addToCart(this.productId).subscribe(
      () => {
          console.log("product added.");
      },
      () => {
        console.log("product not added");
      }
    );
  }

}
