import { Component, OnInit } from '@angular/core';
import { Product, User } from 'src/app/models';
import { ProductService } from 'src/app/services/product.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  currentUser: User;
  constructor(
    private _productService: ProductService,
    private _authService: AuthenticationService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }
  ngOnInit(): void {
    this._authService.authenticatedSubject.subscribe((isAuth) => {
      this.currentUser = this._authService.currentUser;
      this.refreshProducts();
    });
  }

  refreshProducts() {
    console.log(this.currentUser);
    this._productService
      .getProductsBySellerId(this.currentUser.userId)
      .subscribe((result) => {
        this.products = result.result;
        console.log(this.products);
      });
  }

  removeProduct(id: string) {
    if (confirm("Are you sure to delete this product?")) {
      this._productService.deleteProduct(id).subscribe(result => {
        this.refreshProducts();
      }, err => {
        alert(err.error.result.message);
      });
    }
  }

}
