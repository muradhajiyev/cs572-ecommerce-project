import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";
import {ReviewStatus} from "../../models/review.enum";
import {CategoryService} from "../../services/category.service";
import {MenuListModel} from "../../models/menu-list";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ProductDetailsComponent implements OnInit {
  public productId: string;
  public product: Product;
  public menuListModel: MenuListModel = new MenuListModel("Categories1", "cat", []);

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _productService: ProductService,
              private _categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
        this.productId = params.get('id');
        this.getProductDetails(this.productId);
      }
    );

    this._categoryService.getCategories().subscribe(categories => {
      let items: Array<{ id: string, text: string }> = [];
      items.push({ id: "all", text: "All categories" });
      categories.result.forEach(cat => { items.push({ id: cat._id.toString(), text: cat.name }); });
      this.menuListModel = new MenuListModel("Categories2", "cat", items);
    });
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
