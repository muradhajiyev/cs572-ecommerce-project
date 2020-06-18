import { OnInit, Component } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'seller-product-list',
  templateUrl: './seller-product-list.component.html',
  styleUrls: ['./seller-product.component.css'],
})
export class SellerProductList implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {}
}
