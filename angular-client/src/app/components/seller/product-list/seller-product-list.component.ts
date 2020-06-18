import { OnInit, Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'seller-product-list',
  templateUrl: './seller-product-list.component.html',
  styleUrls: ['./seller-product.component.css'],
})
export class SellerProductList implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {}

  public addproduct(event) {
    console.log('HERE');

    this.router.navigateByUrl('/create-product');
  }
}
