import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product, ApiResponse, Review } from 'src/app/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  
  productId: string;
  product: Product;
  review: Review;
  

  reviewForm: FormGroup;
  loading:boolean =false;
  error = '';
  success:string =  '';

  constructor(private _route: ActivatedRoute,
      private _productService: ProductService,
      private reviewService: ReviewService,
      private fb: FormBuilder) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      this.getProductDetails(this.productId);
      this.getReview(this.productId);
    })

    this.reviewForm = this.fb.group({
      stars: [null, Validators.required],
      comment: ['', Validators.required]
    })


  }

  onSubmit(){
    this.loading = true;
    this.error = '';
    this.success = '';
    this.reviewService.saveOrUpdateReview(this.productId, this.reviewForm.controls.stars.value, this.reviewForm.controls.comment.value).subscribe(
      res => { this.success = res.result.success; 
        this.loading = false;},
      error => {
        this.error = error.error.result.message;
        this.loading = false;
    }
    )
  }

  getProductDetails(productId) {
    this._productService.getProductDetails(productId)
      .subscribe((product: ApiResponse<Product>) => {
          this.product = product.result;
          console.log('product', this.product);
        },
        (err) => {
          console.log('error in getting product details', err);
        });
  }
  

  getReview(productId){
    this.reviewService.getReviewByProduct(productId).subscribe((res: ApiResponse<Review>) => {
        this.review = res.result;
        console.log('review', this.review);
        
        this.reviewForm.patchValue({
          stars: this.review.stars,
          comment: this.review.comment
        });
    })
  }

}
