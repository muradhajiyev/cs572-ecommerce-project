import { Component, OnInit } from '@angular/core';
import { MenuListModel } from 'src/app/models/menu-list';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'seller-app-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.css'],
})
export class SellerProfileComponent implements OnInit {
  menuListModel: MenuListModel = new MenuListModel(
    'Seller',
    'menu',
    [
      { id: 'myproducts', text: 'My Products' },
      { id: 'orders', text: 'Orders' },
      { id: 'create-product', text: 'Create Product' },
    ],
    true
  );

  constructor(private route: ActivatedRoute) {
    // route.queryParams.subscribe(queryParams => {
    //   this.currentTab = queryParams['tab'];
    // });
  }

  ngOnInit(): void {}
}
