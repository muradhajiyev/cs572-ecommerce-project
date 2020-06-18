import { OnInit, Component } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product, User } from 'src/app/models';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'seller-product-list',
  templateUrl: './seller-product-list.component.html',
  styleUrls: ['./seller-product.component.css'],
})
export class SellerProductList implements OnInit {
  products: Product[] = [];
  currentUser: User;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) {}
  ngOnInit(): void {
    this.authService.authenticatedSubject.subscribe((isAuth) => {
      this.currentUser = this.authService.currentUser;
      this.refreshProducts();
    });
  }

  refreshProducts() {
    console.log(this.currentUser);
    this.productService
      .getProductsBySellerId(this.currentUser.userId)
      .subscribe((result) => {
        this.products = result.result;
        console.log(this.products);
      });
  }

  onAddClickButton(event) {
    console.log('btn clicked');
    this.router.navigate(['add']);
  }
}
